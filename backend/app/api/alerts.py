from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List
from datetime import datetime

router = APIRouter()

class AlertSchema(BaseModel):
    id: int
    type: str
    message: str
    severity: str
    created_at: datetime
    is_read: bool

    class Config:
        from_attributes = True

@router.get("/", response_model=List[AlertSchema])
async def get_alerts(db: Session = Depends(get_db)):
    return db.query(models.Alert).order_by(models.Alert.created_at.desc()).all()

@router.post("/mark-read/{alert_id}")
async def mark_alert_read(alert_id: int, db: Session = Depends(get_db)):
    alert = db.query(models.Alert).get(alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.is_read = True
    db.commit()
    return {"status": "success"}

@router.post("/create")
async def create_alert(type: str, message: str, severity: str, branch_id: int, db: Session = Depends(get_db)):
    alert = models.Alert(
        type=type,
        message=message,
        severity=severity,
        branch_id=branch_id
    )
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
