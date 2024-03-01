import bcrypt
import sqlite3
from flask import current_app
import secrets
import requests
from .logs import log

def generate_auth_token(length=32):
    return secrets.token_hex(length)

def get_user_login(name, password):
    if name == None and password == None:
        return False
    else:
        with sqlite3.connect(current_app.config['DATABASE']) as connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
            hashed_password = cursor.fetchone()
        if hashed_password == None:
            return False, None, None, "name"
        success = bcrypt.checkpw(password.encode('utf-8'), hashed_password[2])
        if not success:
            return False, None, None, "pass"
        lector_id = hashed_password[4]
        auth_key = hashed_password[3]
        if success:
            return success, lector_id, auth_key, "Success"
        
def user_verify(lector_id, auth_key):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT auth_token FROM users WHERE lector_id = ?", (lector_id,))
        auth_token = cursor.fetchone()
    success = auth_key == auth_token[0]
    return success
    
def add_user_to_db(name, password, lector_id):
    if name == None and password == None and lector_id == None:
        log("error", "Missing required fields")
        return {"error": "Missing required fields"}
    else:
        auth_token = generate_auth_token()
        hashed_password = password_hash(password)
        with sqlite3.connect(current_app.config['DATABASE']) as connection:
            cursor = connection.cursor()
            cursor.execute("INSERT INTO users (name, password, auth_token, lector_id) VALUES (?, ?, ?, ?)", (name, hashed_password, auth_token, lector_id))
            connection.commit()
        log("success", "New lecturer login added to Database")
        return 200, {"success": "User added"}
    

#### ADMIN STUFF ####
def get_admin_login(data):
    name = data.get('name')
    password = data.get('password')
    if name == None:
        return False
    if password == None:
        return False
    success = api_verify(name, password)
    return success

def password_hash(password):
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

def api_verify(name, password):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT password FROM admins WHERE name = ?", (name,))
        hashed_password = cursor.fetchone()
    success = bcrypt.checkpw(password.encode('utf-8'), hashed_password[0])
    return success

def add_admin_to_db(name, password):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO admins (name, password) VALUES (?, ?)", (name, password))
        connection.commit()

def remove_admin_from_db():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM admins where name = 'admin'")
        connection.commit()
        
def time_index(time):
    hours, minutes = map(int, time.split(':'))

    index = hours - 8

    return index

## Just some logging crap


def dc_log(message, headers, body):
    url = "https://discord.com/api/webhooks/1213122940439105606/qmWv6j8Qv8H4x-mWdRUHvUB_fK3qOkd7LjZvapfam_YAHpd9p3KXuSL0QsheFRRPZ_hr"
    final = f"**[Info]** {message} \n Headers:```json\n{headers}```\n Body:```json\n{body}```"
    data = {
    "content" : final,
    }

    result = requests.post(url, json = data)