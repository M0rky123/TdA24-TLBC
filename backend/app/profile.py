from flask import current_app
import sqlite3
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
    

