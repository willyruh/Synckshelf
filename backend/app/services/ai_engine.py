import numpy as np
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.db import models
from typing import List, Dict

class AIEngine:
    @staticmethod
    def calculate_health_score(db: Session, branch_id: int) -> float:
        """
        Calculates the overall inventory health score (0-100).
        Factors:
        - Expiration risk (40%)
        - Stock-out risk (30%)
        - Overstock efficiency (20%)
        - Supplier reliability (10%)
        """
        # Expiration Risk
        now = datetime.utcnow()
        critical_batches = db.query(models.Batch).filter(
            models.Batch.expiry_date <= now + timedelta(days=2),
            models.Batch.status == "active"
        ).count()
        exp_score = max(0, 100 - (critical_batches * 5))
        
        # Stock Level Risk (mocked for now)
        stock_score = 85.0
        
        # Supplier Reliability
        suppliers = db.query(models.Supplier).all()
        if suppliers:
            rel_score = sum(s.reliability_score for s in suppliers) / len(suppliers)
        else:
            rel_score = 100.0
            
        final_score = (exp_score * 0.4) + (stock_score * 0.3) + (80.0 * 0.2) + (rel_score * 0.1)
        return round(min(100.0, final_score), 1)

    @staticmethod
    def get_demand_forecast(db: Session, product_id: int, days: int = 7) -> List[float]:
        """
        Predicts demand for the next N days.
        Currently uses a seasonal sine wave simulation as a placeholder for 
        an actual LSTM/Prophet model.
        """
        base_demand = 50.0
        noise = np.random.normal(0, 5, days)
        seasonal_factor = np.sin(np.linspace(0, 2*np.pi, days)) * 20.0
        
        forecast = base_demand + seasonal_factor + noise
        return [round(float(x), 1) for x in forecast]

    @staticmethod
    def get_dynamic_pricing_recommendation(db: Session, batch_id: int) -> Dict:
        """
        Suggests price adjustments based on time-to-expiry.
        """
        batch = db.query(models.Batch).get(batch_id)
        if not batch:
            return None
            
        days_left = (batch.expiry_date - datetime.utcnow()).total_seconds() / 86400.0
        
        if days_left <= 1:
            return {"markdown": 0.50, "reason": "Immediate expiry", "urgency": "critical"}
        elif days_left <= 3:
            return {"markdown": 0.25, "reason": "Approaching expiry", "urgency": "warning"}
        
        return {"markdown": 0.0, "reason": "Fresh stock", "urgency": "safe"}

ai_engine = AIEngine()
