from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List

router = APIRouter()

class SupplierSchema(BaseModel):
    id: int
    name: str
    category: str
    reliability_score: float

    class Config:
        from_attributes = True

@router.get("/", response_model=List[SupplierSchema])
async def list_suppliers(db: Session = Depends(get_db)):
    return db.query(models.Supplier).all()

@router.get("/orders")
async def list_purchase_orders(db: Session = Depends(get_db)):
    return db.query(models.PurchaseOrder).all()
