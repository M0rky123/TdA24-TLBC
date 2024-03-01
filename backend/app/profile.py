from flask import current_app, jsonify
import sqlite3, json
from datetime import datetime, timedelta
import uuid as uuidgen
from .utils import user_verify

def generate_ical(lecturer_id, auth_token):
    logged = user_verify(lecturer_id, auth_token)
    if logged: 
        with sqlite3.connect(current_app.config['DATABASE']) as connection:
            cursor = connection.cursor()
            cursor.execute("SELECT * FROM reservations WHERE lecturer_id=?", (lecturer_id,))
            data = cursor.fetchall()
            if data:
                ical = "BEGIN:VCALENDAR\n"
                ical += "VERSION:2.0\n"
                ical += "PRODID:-//Kantorikalendar//iCal4j 1.0//EN\n"
                ical += "CALSCALE:GREGORIAN\n"
                ical += "METHOD:PUBLISH\n"
                for reservation in data:
                    event_uid = str(uuidgen.uuid4())  # assuming you have a function for generating unique UIDs
                    start_datetime_str = f"{reservation[4]} {reservation[5]}"
                    start_datetime = datetime.strptime(start_datetime_str, '%d.%m.%Y %H:%M')
                    end_datetime = start_datetime + datetime.timedelta(hours=1)
                    ical += "BEGIN:VEVENT\n"
                    ical += f"UID:{event_uid}\n"
                    ical += f"SUMMARY:Reservation with {reservation[2]}\n"
                    ical += f"DTSTART:{start_datetime.strftime('%Y%m%dT%H%M%S')}\n"
                    ical += f"DTEND:{end_datetime.strftime('%Y%m%dT%H%M%S')}\n"
                    ical += "END:VEVENT\n"
                ical += "END:VCALENDAR\n"
                return ical, 200
            else:
                return "", 204 
    else:
        return {"message": "Unauthorized"}, 401
    

def lecturer_reservations(lecturer_id):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM reservations WHERE lecturer_id=?", (lecturer_id,))
        data = cursor.fetchall()
        unread = []
        accepted = []
        declined = []
        for reservation in data:
            reservation_data = {
                    "reservation_id": reservation[1], 
                    "lecturer_id": reservation[2],  # Assuming lecturer_id is in the first column
                    "client_name": reservation[3],
                    "client_email": reservation[4],
                    "client_phone": reservation[5],
                    "date": reservation[6],
                    "time_index": reservation[8],
                    "online": reservation[9],
                    "place": reservation[10],
                    "note": reservation[11],
                    "responded": reservation[12],
                    "accepted": reservation[13]
            }
            if reservation[12] == False:
                unread.append(reservation_data)
            elif reservation[13] == True:
                accepted.append(reservation_data)
            else:
                declined.append(reservation_data)

            
        reservations_json = {"unread": unread, "accepted": accepted, "declined": declined}
        return reservations_json
    

