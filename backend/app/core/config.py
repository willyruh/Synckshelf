from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost/synckshelf"
    SECRET_KEY: str = "yoursecretkeyhere_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    REDIS_URL: str = "redis://localhost:6379/0"
    PORT: int = 8000
    
    model_config = {
        "env_file": ".env",
        "extra": "ignore"
    }

settings = Settings()
