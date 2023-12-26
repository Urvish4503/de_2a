from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from .models import TokenData, Token, User
from .db import get_db
from .config import config

SECRET_KEY = config.secret_key
ALGORITHM = config.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = config.access_token_expire_minutes

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict) -> Token:
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_token: str = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)

    return Token(access_token=encoded_token, token_type="bearer")


def verify_access_token(token: str, credentials_exception) -> TokenData | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id: str | None = payload.get("user_id")

        if user_id is None:
            raise credentials_exception

        token_data: TokenData = TokenData(id=str(user_id))

    except JWTError:
        raise credentials_exception

    return token_data


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User | None:
    credentaials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credential",
        headers={"WWW-Authenticate": "Bearer"},
    )

    current_user_verification = verify_access_token(token, credentaials_exception)

    if current_user_verification is None:
        raise credentaials_exception

    current_user = (
        db.query(User).filter(User.id == current_user_verification.id).first()
    )

    return current_user