from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.db import models
from pydantic import BaseModel
from typing import List

router = APIRouter()

class BranchSchema(BaseModel):
    id: int
    name: str
    location: str

    class Config:
        from_attributes = True

@router.get("/", response_model=List[BranchSchema])
async def list_branches(db: Session = Depends(get_db)):
    return db.query(models.Branch).all()
