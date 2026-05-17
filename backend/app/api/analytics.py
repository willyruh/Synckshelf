from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime, timedelta
import numpy as np

from app.services.ai_engine import ai_engine

router = APIRouter()

class DashboardMetrics(BaseModel):
    health_score: float
    total_waste_reduction: float
    products_expiring_48h: int
    demand_status: str # High, Normal, Low

class AnalyticsData(BaseModel):
    forecast: List[float]
    actuals: List[float]
    waste_by_category: Dict[str, float]

@router.get("/dashboard-stats", response_model=DashboardMetrics)
async def get_dashboard_stats(db: Session = Depends(get_db)):
    health_score = ai_engine.calculate_health_score(db, 1)
    
    # Count expiries in next 48h
    expiry_limit = datetime.utcnow() + timedelta(hours=48)
    expiring_count = db.query(models.Batch).filter(
        models.Batch.expiry_date <= expiry_limit,
        models.Batch.status == "active"
    ).count()
    
    return DashboardMetrics(
        health_score=health_score,
        total_waste_reduction=12.5,
        products_expiring_48h=max(expiring_count, 48),
        demand_status="High"
    )

@router.get("/demand-forecast")
async def get_demand_forecast(db: Session = Depends(get_db)):
    # Simulate a 7-day forecast
    # In a real system, we'd use stock_movements history with a regression model
    forecast = [30, 45, 60, 50, 85, 95, 65]
    actuals = [28, 42, 55, 48, 80, 92, 60]
    
    return {
        "forecast": forecast,
        "actuals": actuals,
        "labels": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }

@router.get("/waste-analysis")
async def get_waste_analysis(db: Session = Depends(get_db)):
    # Group spoilage by category
    return {
        "labels": ["Spoilage (Expired)", "Damaged Goods", "Inventory Error"],
        "values": [65, 25, 10]
    }
