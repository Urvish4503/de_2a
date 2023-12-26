import uuid
from sqlalchemy import String, Column
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from sqlalchemy.dialects.postgresql import UUID
from .db import Base
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        nullable=False,
    )
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    created_at = Column(
        TIMESTAMP(timezone=True), server_default=text("now()"), nullable=False
    )


class NewUser(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6)


class UserDetail(BaseModel):
    email: EmailStr
    id: uuid.UUID


class UserOut(UserDetail):
    created_at: datetime


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: str