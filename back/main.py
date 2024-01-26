from fastapi import FastAPI
import os
from dotenv import load_dotenv
import pymysql


app = FastAPI()
load_dotenv()

def mysql_create_session():
    conn = pymysql.connect(
       host=os.getenv("DB_URL"), 
       user=os.getenv("USER"), 
       password=os.getenv("PASSWORD"), 
       db=os.getenv("DB_NAME"), 
       charset="utf8", 
       cursorclass=pymysql.cursors.DictCursor
    )
    cur = conn.cursor()
    return conn, cur

@app.get("/staffInfo")
def getStaffInfoByName():
  conn, cur = mysql_create_session() 
  try:
    sql = "SELECT * FROM staff"
    cur.execute(sql)
    row = cur.fetchone()
  finally:
    conn.close()
  return row