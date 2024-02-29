from flask import jsonify
import requests
import json

url = "http://127.0.0.1:8080/api/reserve/934f7782-b7fe-46a9-9e4d-4c37a0cd9710"
url_get_all = "http://127.0.0.1:5000/api/lecturers"
#url = "http://f7b5d5a152c395f1.app.tourdeapp.cz/api/lecturers/999a8b5f-8dda-4ba8-8a15-21df6110f573"
#Need to force commit lol

test = {
    "name": "add sdfsdf",
    "email": "sdfdsf@gmail.com",
    "phone": "354654654",
    "date": "29.02.2024",
    "time": "12:00",
    "online": False,
    "place": "Praha 1, Česko",
    "note": "dfssdfsdf"
}


# Convert the data to JSON
json_post_data = json.dumps(test)

# Make the POST request
#reponse = requests.get(url_get_all)
#taprint(reponse)
response_post = requests.post(url, json=test, headers={"Content-Type": "application/json"})
print("POST Response:")
print(response_post.status_code)
print(type(response_post.text))
print(response_post.text)