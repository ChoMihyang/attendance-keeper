from fastapi import FastAPI, status, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
import pymysql
from pydantic import BaseModel
from datetime import datetime
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


load_dotenv()


def mysql_create_session():
    conn = None
    cur = None

    try:
        conn = pymysql.connect(
            host=os.getenv("DB_URL"),
            user=os.getenv("DB_USER"),
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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(RequestValidationError)
async def handler(request:Request, exc:RequestValidationError):
    print(exc)
    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

class Staff(BaseModel):
    name: str
    staff_id: str
    auth: str
    password: str


class LoginData(BaseModel):
    staff_id: str
    password: str


class StaffId(BaseModel):
    staff_id: int


class Attendance(BaseModel):
    staff_id: int
    date: str
    attendance_start_time: str
    attendance_end_time: str


@app.get("/")
async def root():
    return {"message": "Hello!"}

# スタッフを登録するAPI作成
# TODO: ランダムパスワードの作成する
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
        "message": "success",
        "staff": {
            # 初期パスワードを返す
        }
    }


# ログインAPI作成
@app.post("/api/login")
async def login_staff(body: LoginData, status_code=status.HTTP_200_OK):
    try:
        sql = "SELECT password FROM staff WHERE staff_id = {}".format(
            body.staff_id)
        cur.execute(sql)
        response = cur.fetchone()
        if response['password'] != body.password:
            return {
                "message": "IDまたはパスワードが間違っています"
            }

        return {"message": "success"}
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="ログインに失敗しました"
        )


# スタッフの権限情報を取得するAPI作成
@app.get("/api/account")
async def get_account(body: StaffId, status_code=status.HTTP_200_OK):
    try:
        sql = "SELECT auth FROM staff WHERE staff_id = {}".format(
            body.staff_id)
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
            "auth": response
        }
    }

# 出勤時間を記録するAPI作成
@app.post("/api/attendance")
async def attend_start(body: Attendance, status_code=status.HTTP_201_CREATED):
    try:
        date = datetime.now().strftime('%Y-%m-%d')
        start_datetime = datetime.now().strftime('%H:%M:%S')
        sql = "INSERT INTO attendance (staff_id, date, attendance_start_time) VALUES (%s, %s, %s)"
        cur.execute(sql, (body.staff_id, date, start_datetime))
        conn.commit()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="出勤に失敗しました"
        )
    return {
        "message": "出勤に成功しました",
        "attendance": {
            "date": date,
            "attendance_start_time": start_datetime,
            "attendance_end_time": body.attendance_end_time
        }
    }

# 退勤時間を記録するAPI作成
@app.patch("/api/attendance")
async def attend_end(body: Attendance, status_code=status.HTTP_200_OK):
    try:
        date = datetime.now().strftime('%Y-%m-%d')
        end_datetime = datetime.now().strftime('%H:%M:%S')
        sql = "UPDATE attendance SET attendance_end_time = %s WHERE staff_id = %s AND date = %s"
        cur.execute(sql, (end_datetime, body.staff_id, date))
        conn.commit()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="退勤に失敗しました"
        )
    return {
        "message": "退勤に成功しました",
        "attendance": {
            "date": date,
            "attendance_start_time": body.attendance_start_time,
            "attendance_end_time": end_datetime
        }
    }


# 出退勤情報を取得するAPI作成
@app.get("/api/attendance")
async def get_attendance_all():
    try:
        date = datetime.now().strftime('%Y-%m-%d')
        sql = "SELECT staff.name, attendance.staff_id, attendance.attendance_start_time, attendance.attendance_end_time FROM attendance LEFT OUTER JOIN staff ON staff.staff_id = attendance.staff_id where date = {}".format(
            date)
        cur.execute(sql)
        response = cur.fetchall()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="出退勤情報取得に失敗しました"
        )
    return {
        "message": "出退勤情報取得に成功しました",

        "result": response
    }

# 特定スタッフの出退勤情報を取得するAPI作成


@app.get("/api/attendance/{staff_id}")
async def get_attendance_one(staff_id: int):
    try:
        sql = "SELECT date, attendance_start_time, attendance_end_time FROM attendance WHERE staff_id = {}".format(
            staff_id)
        cur.execute(sql)
        response = cur.fetchall()
    except Exception as e:
        print("error", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="{} スタッフの出退勤情報の取得に失敗しました".format(staff_id)
        )
    return {
        "message": "{} スタッフの出退勤情報の取得に成功しました".format(staff_id),
        "result": response
    }
