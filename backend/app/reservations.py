from datetime import datetime
import sqlite3
from flask import current_app, jsonify
import uuid as uuidgen

from .email import reserve_confirm
from .utils import time_index

def make_reservation(data, lecturer_id):
    client_name = data.get('name')
    client_email = data.get('email')
    client_phone = data.get('phone')
    date = data.get('date')
    time = data.get('time')
    index = time_index(time)
    reservation_id = str(uuidgen.uuid4())
    online = data.get('online')
    place = data.get('place', None)
    note = data.get('note', None)


    try:
        with sqlite3.connect(current_app.config['DATABASE']) as connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM reservations WHERE date=? AND time_index=? AND lecturer_id=?", (date, index, lecturer_id))
            if cursor.fetchone():
                return "Time already reserved", 400
            cursor.execute("INSERT INTO reservations (reservation_id, lecturer_id, client_name, client_email, client_phone, date, time, time_index, online, place, note, responded) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", (reservation_id, lecturer_id, client_name, client_email, client_phone, date, time, index, online, place, note, False))
            connection.commit()
            cursor.execute("SELECT first_name, middle_name, last_name, phone FROM lecturers WHERE uuid=?", (lecturer_id,))
            lecturer_data = cursor.fetchone()

        if lecturer_data[1] is not None:
            lecturer_name = lecturer_data[0] + " " + lecturer_data[1] + " " + lecturer_data[2]
        else:
            lecturer_name = lecturer_data[0] + " " + lecturer_data[2]

        lecturer_all_phone = eval(lecturer_data[3])
        lecturer_phone = lecturer_all_phone[0]
        if online:
            place = "Online"
        #reserve_confirm(client_email, lecturer_name, date, time, lecturer_phone, place)
        return "Success", 200
    except Exception as e:
        return str(e), 400
   
def check_day(lecturer_id, date):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT time_index FROM reservations WHERE date=? AND lecturer_id=?", (date, lecturer_id))
        data = cursor.fetchall()
        index_list = []
        if data: 
            for i in data:
                index_list.append(i[0])
            return {"reserved_times": index_list}, 200
        else:
            return {"message": "No reservations for this day"}, 404
        
def check_month(lecturer_id, month, year):
    print(f"01.{month}.{year}", f"31.{month}.{year}")
    month = int(month)
    year = int(year)


    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        #cursor.execute("SELECT date, COUNT(*) FROM reservations WHERE date BETWEEN ? AND ? AND lecturer_id = ? GROUP BY date", (start, end, lecturer_id))
        cursor.execute("SELECT date, COUNT(*) FROM reservations WHERE substr(date, 4, 2) = ? AND substr(date, 7, 4) = ? AND lecturer_id = ? GROUP BY date", (f"{month:02d}", f"{year}", lecturer_id))
        data = cursor.fetchall()
        print(data)
        if data == []:
            return {"message": "No reservations for this month"}, 404
        else:
            month_reservations = [{"date": datetime.strptime(row[0], "%d.%m.%Y").day, "count": 12 - int(row[1])} for row in data]
            print(month_reservations)
            return month_reservations, 200
