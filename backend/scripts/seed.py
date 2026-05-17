import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.db import models
from app.core.security import get_password_hash
from datetime import datetime, timedelta

def seed_db():
    # 0. Create tables
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if data already exists (clear it if needed for a clean test)
    # db.query(models.User).delete()
    
    if db.query(models.User).first():
        print("Database already seeded. Skipping...")
        return

    # 1. Create Store & Branch
    store = models.Store(name="SynckShelf HQ", type="Grocery")
    db.add(store)
    db.flush()
    
    branch = models.Branch(name="Main Street Hub", location="Downtown", store_id=store.id)
    db.add(branch)
    db.flush()

    # 2. Create Users (Production Test Accounts)
    users_data = [
        {"email": "admin@synckshelf.com", "password": "Admin123!", "full_name": "System Administrator"},
        {"email": "manager@synckshelf.com", "password": "Manager123!", "full_name": "Hub Manager"},
        {"email": "staff@synckshelf.com", "password": "Staff123!", "full_name": "Operations Staff"},
    ]
    
    for u in users_data:
        db_user = models.User(
            email=u["email"],
            hashed_password=get_password_hash(u["password"]),
            full_name=u["full_name"],
            is_active=True
        )
        db.add(db_user)
    
    # 3. Create Products
    products = [
        {"sku": "SKU-4920", "name": "Organic Kale", "category": "Produce", "unit": "units", "base_cost": 2.50},
        {"sku": "SKU-3310", "name": "Free-Range Chicken Breast", "category": "Meat", "unit": "kg", "base_cost": 12.00},
        {"sku": "SKU-8821", "name": "Greek Yogurt - Plain", "category": "Dairy", "unit": "units", "base_cost": 3.20},
    ]
    
    db_products = []
    for p in products:
        dp = models.Product(**p, store_id=store.id)
        db.add(dp)
        db_products.append(dp)
    db.flush()

    # 4. Create Inventory Items
    for dp in db_products:
        inv = models.InventoryItem(product_id=dp.id, branch_id=branch.id, quantity=100.0)
        db.add(inv)
    
    db.commit()
    print("Database seeded successfully with production test accounts.")

if __name__ == "__main__":
    seed_db()
