from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import engine, Base, get_db
from .models import User, NewUser, UserOut, Token, TokenData

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/login")
def login(
        
    db: Session = Depends(get_db),
):
    try:
        new_user = NewUser(email="testuser1@de.com", password="testingpassword")
        db.add(User(**new_user.model_dump()))
        db.commit()

        return {"message": "Hello World"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))