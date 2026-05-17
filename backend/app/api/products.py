from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ProductCreate(BaseModel):
    sku: str
    name: str
    category: str
    unit: str
    base_cost: float

class ProductSchema(ProductCreate):
    id: int
    class Config:
        from_attributes = True

@router.get("/", response_model=List[ProductSchema])
async def list_products(db: Session = Depends(get_db)):
    return db.query(models.Product).all()

@router.post("/", response_model=ProductSchema)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = models.Product(**product.dict(), store_id=1) # Default store
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product
