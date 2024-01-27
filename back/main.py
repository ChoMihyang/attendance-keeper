from fastapi import FastAPI, status, HTTPException, Form
import os
from dotenv import load_dotenv
import pymysql
from pydantic import BaseModel
from typing import Annotated

load_dotenv()

def mysql_create_session():
    conn = None
    cur = None

    try:
        conn = pymysql.connect(
            host=os.getenv("DB_URL"),
            user=os.getenv("USER"),
            password=os.getenv("PASSWORD"),
            db=os.getenv("DB_NAME"),
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor
        )
        cur = conn.cursor()
    except pymysql.err.OperationalError as e:
        print("error", e)
        exit(1)
    
    print("DB connected")
    return conn, cur

conn, cur = mysql_create_session()
app = FastAPI()


class Staff(BaseModel):
    name: str
    staff_id: int
    auth: str
    password: str
    
class LoginData(BaseModel):
    staff_id: int
    password: str

class Auth(BaseModel):
    staff_id: int



@app.get("/")
async def root():
    return {"message": "Hello!"}

# スタッフを登録するAPI作成
@app.post("/api/register")
async def register_staff(body: Staff, status_code=status.HTTP_201_CREATED):
    try:
        sql = "INSERT INTO staff (name, staff_id, auth, password) VALUES (%s, %s, %s, %s)"
        cur.execute(sql, (body.name, body.staff_id, body.auth, body.password))

        conn.commit()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="登録に失敗しました"
        )
    

    return {
        "message": "登録に成功しました",
        "staff": {
            "id": cur.lastrowid,
            "name": body.name,
            "staff_id": body.staff_id,
            "auth": body.auth,
            "password": body.password
        }
    }


# ログインAPI作成
@app.post("/api/login")
async def login_staff(body: LoginData, status_code=status.HTTP_200_OK):
    try:
        sql = "SELECT password FROM staff WHERE staff_id = {}".format(body.staff_id)
        cur.execute(sql)
        response = cur.fetchone()
        if response['password'] != body.password:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="ログインに失敗しました"
            )
        return {"message": "ログインに成功しました"}
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ログインに失敗しました"
        )

# スタッフの権限情報を取得するAPI作成
@app.get("/api/account")
async def get_account(body: Auth, status_code=status.HTTP_200_OK):
    try:
        sql = "SELECT auth FROM staff WHERE staff_id = {}".format(body.staff_id)
        cur.execute(sql)
        response = cur.fetchone()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="権限取得に失敗しました"
        )
    return {
        "message": "権限取得に成功しました",
        "staff": {
            "auth": response['auth']
        }
    }
