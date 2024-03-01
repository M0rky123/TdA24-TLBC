from flask import jsonify
import requests
import json

url = "http://127.0.0.1:8080/api/reserve/e6554a70-dc22-41ac-8ccf-65185849a3f0"
url_get_all = "http://127.0.0.1:5000/api/lecturers"
#url = "http://f7b5d5a152c395f1.app.tourdeapp.cz/api/lecturers/999a8b5f-8dda-4ba8-8a15-21df6110f573"
#Need to force commit lol

test = {
    "name": "Karel",
    "email": "matyas.cernik@gmail.com",
    "phone": "666999000",
    "date": "16.05.2024",
    "time": "12:00",
    "online": True,
    "note": "Test"
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