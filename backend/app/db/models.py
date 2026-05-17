from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Enum, JSON, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
import enum

Base = declarative_base()

class UserRole(enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    STAFF = "staff"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(UserRole), default=UserRole.STAFF)
    store_id = Column(Integer, ForeignKey("stores.id"))
    branch_id = Column(Integer, ForeignKey("branches.id"))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    store = relationship("Store", back_populates="users")
    branch = relationship("Branch", back_populates="users")

class Store(Base):
    __tablename__ = "stores"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String) # e.g., Grocery, Restaurant
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="store")
    branches = relationship("Branch", back_populates="store")
    products = relationship("Product", back_populates="store")
    suppliers = relationship("Supplier", back_populates="store")

class Branch(Base):
    __tablename__ = "branches"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    store_id = Column(Integer, ForeignKey("stores.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    store = relationship("Store", back_populates="branches")
    users = relationship("User", back_populates="branch")
    inventory = relationship("InventoryItem", back_populates="branch")

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    unit = Column(String) # e.g., kg, units, packs
    base_cost = Column(Float)
    store_id = Column(Integer, ForeignKey("stores.id"))
    created_at = Column(DateTime, default=datetime.utcnow)

    store = relationship("Store", back_populates="products")
    inventory_items = relationship("InventoryItem", back_populates="product")
    batches = relationship("Batch", back_populates="product")

class InventoryItem(Base):
    __tablename__ = "inventory_items"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    branch_id = Column(Integer, ForeignKey("branches.id"))
    quantity = Column(Float, default=0.0)
    last_updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    product = relationship("Product", back_populates="inventory_items")
    branch = relationship("Branch", back_populates="inventory")

class Batch(Base):
    __tablename__ = "batches"
    id = Column(Integer, primary_key=True, index=True)
    batch_number = Column(String, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    quantity = Column(Float)
    expiry_date = Column(DateTime, nullable=False)
    received_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="active") # active, expired, disposed, sold

    product = relationship("Product", back_populates="batches")
    supplier = relationship("Supplier", back_populates="batches")

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    contact_email = Column(String)
    category = Column(String)
    reliability_score = Column(Float, default=100.0)
    store_id = Column(Integer, ForeignKey("stores.id"))

    store = relationship("Store", back_populates="suppliers")
    batches = relationship("Batch", back_populates="supplier")
    purchase_orders = relationship("PurchaseOrder", back_populates="supplier")

class PurchaseOrder(Base):
    __tablename__ = "purchase_orders"
    id = Column(Integer, primary_key=True, index=True)
    order_number = Column(String, unique=True, index=True)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"))
    status = Column(String, default="pending") # pending, in_transit, delivered, delayed
    total_value = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    supplier = relationship("Supplier", back_populates="purchase_orders")

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    type = Column(String) # expiry, low_stock, anomaly
    message = Column(Text)
    branch_id = Column(Integer, ForeignKey("branches.id"))
    severity = Column(String) # critical, warning, safe
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class StockMovement(Base):
    __tablename__ = "stock_movements"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    branch_id = Column(Integer, ForeignKey("branches.id"))
    quantity = Column(Float)
    type = Column(String) # inbound, outbound, adjustment, spoilage
    reason = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
