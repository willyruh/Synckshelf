from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, inventory, products, expiry, alerts, analytics, suppliers, branches, websocket
from app.db.models import Base
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="SynckShelf API", version="1.0.0")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(products.router, prefix="/api/products", tags=["Products"])
app.include_router(expiry.router, prefix="/api/expiry", tags=["Expiry"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(suppliers.router, prefix="/api/suppliers", tags=["Suppliers"])
app.include_router(branches.router, prefix="/api/branches", tags=["Branches"])
app.include_router(websocket.router, tags=["WebSockets"])

@app.get("/")
async def root():
    return {"message": "Welcome to SynckShelf API — Production Grade Perishable Inventory Intelligence"}
