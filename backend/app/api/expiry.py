from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta

router = APIRouter()

class ExpiryInsight(BaseModel):
    batch_id: int
    product_name: str
    expiry_date: datetime
    days_left: float
    urgency: str # critical, warning, safe
    risk_score: float # 0.0 to 100.0

@router.get("/monitor", response_model=List[ExpiryInsight])
async def monitor_expiries(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    batches = db.query(models.Batch).join(models.Product).filter(models.Batch.status == "active").all()
    
    insights = []
    for b in batches:
        days_left = (b.expiry_date - now).total_seconds() / 86400.0
        
        urgency = "safe"
        risk_score = 0.0
        
        if days_left <= 1:
            urgency = "critical"
            risk_score = 90.0 + (1.0 - days_left) * 10.0
        elif days_left <= 3:
            urgency = "warning"
            risk_score = 50.0 + (3.0 - days_left) * 20.0
        else:
            risk_score = max(0.0, 50.0 - (days_left - 3.0) * 5.0)
            
        insights.append(ExpiryInsight(
            batch_id=b.id,
            product_name=b.product.name,
            expiry_date=b.expiry_date,
            days_left=max(0.0, days_left),
            urgency=urgency,
            risk_score=min(100.0, risk_score)
        ))
        
    return sorted(insights, key=lambda x: x.days_left)

@router.post("/dispose/{batch_id}")
async def dispose_expired_batch(batch_id: int, db: Session = Depends(get_db)):
    batch = db.query(models.Batch).get(batch_id)
    if not batch:
        raise HTTPException(status_code=404, detail="Batch not found")
        
    batch.status = "disposed"
    
    # Record as spoilage in stock movements
    movement = models.StockMovement(
        product_id=batch.product_id,
        branch_id=1, # Default or get from context
        quantity=-batch.quantity,
        type="spoilage",
        reason="Expired batch disposal"
    )
    db.add(movement)
    
    # Update inventory
    inv = db.query(models.InventoryItem).filter(
        models.InventoryItem.product_id == batch.product_id,
        models.InventoryItem.branch_id == 1
    ).first()
    if inv:
        inv.quantity -= batch.quantity
        
    db.commit()
    return {"message": "Batch disposed successfully"}
