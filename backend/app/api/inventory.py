from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

router = APIRouter()

class InventoryItemBase(BaseModel):
    product_id: int
    branch_id: int
    quantity: float

class InventoryItemCreate(InventoryItemBase):
    pass

class InventoryItemUpdate(BaseModel):
    quantity: float
    reason: str

class InventoryItem(InventoryItemBase):
    id: int
    last_updated: datetime

    class Config:
        from_attributes = True

@router.get("/", response_model=List[InventoryItem])
async def get_all_inventory(db: Session = Depends(get_db)):
    return db.query(models.InventoryItem).all()

@router.get("/{branch_id}", response_model=List[InventoryItem])
async def get_branch_inventory(branch_id: int, db: Session = Depends(get_db)):
    return db.query(models.InventoryItem).filter(models.InventoryItem.branch_id == branch_id).all()

@router.post("/adjust", response_model=InventoryItem)
async def adjust_stock(adjustment: InventoryItemUpdate, product_id: int, branch_id: int, db: Session = Depends(get_db)):
    item = db.query(models.InventoryItem).filter(
        models.InventoryItem.product_id == product_id,
        models.InventoryItem.branch_id == branch_id
    ).first()
    
    if not item:
        item = models.InventoryItem(product_id=product_id, branch_id=branch_id, quantity=0.0)
        db.add(item)
    
    item.quantity += adjustment.quantity
    
    # Log stock movement
    movement = models.StockMovement(
        product_id=product_id,
        branch_id=branch_id,
        quantity=adjustment.quantity,
        type="adjustment",
        reason=adjustment.reason
    )
    db.add(movement)
    
    db.commit()
    db.refresh(item)
    return item
