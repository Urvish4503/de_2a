from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Annotated
from .db import engine, Base, get_db
from .models import User, NewUser, UserOut, Token, TokenData
from .utils import hash, verify
from .oauth import create_access_token

Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/new_user", status_code=status.HTTP_201_CREATED, response_model=UserOut)
def create_new_user(
    user: NewUser,
    db: Annotated[Session, Depends(get_db)],
):
    try:
        does_user_exist = db.query(User).filter(User.email == user.email).first()

        if does_user_exist:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT, detail="User already exists"
            )

        user.password = hash(user.password)

        new_user = User(**user.model_dump())

        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    else:
        return new_user


@app.post("/login", response_model=Token)
def login(
    user_cred: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[Session, Depends(get_db)],
):
    try:
        # here there is a problem with OAuth2PasswordRequestForm naming
        # as it will return username but here it is email.
        # so thats why we are comparing username with email here.
        user = db.query(User).filter(User.email == user_cred.username).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found with this email",
            )

        # now checking for user's password
        if not verify(user_cred.password, user_cred.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password"
            )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    else:
        access_token = create_access_token(data={"sub": user_cred.username})
        return {"access_token": access_token, "token_type": "bearer"}
