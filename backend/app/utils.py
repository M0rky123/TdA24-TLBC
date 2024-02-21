import bcrypt
import sqlite3
from flask import current_app


def get_login(data):
    name = data.get('name')
    print(name)
    password = data.get('password')
    print(password)
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
        print(hashed_password[0])
    success = bcrypt.checkpw(password.encode('utf-8'), hashed_password[0])
    return success

def add_admin_to_db(name, password):
    print(name, password)
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO admins (name, password) VALUES (?, ?)", (name, password))
        connection.commit()

def remove_admin_from_db():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM admins where name = 'admin'")
        connection.commit()