from flask import jsonify
import requests
import json

reserve = {
    "lector_id": "string",
    "name": "string",
    
}




url = "http://127.0.0.1:8080/api/lecturers/filter"
url_get_all = "http://127.0.0.1:80/api/lecturers/934f7782-b7fe-46a9-9e4d-4c37a0cd9710"
#url = "http://f7b5d5a152c395f1.app.tourdeapp.cz/api/lecturers/999a8b5f-8dda-4ba8-8a15-21df6110f573"
#Need to force commit lol

# Your JSON data for POST request
post_data = {
    "tag": ["Fitness", "Ethics"],
    "loc": ["Portland", "Denver"]
}



# Convert the data to JSON
json_post_data = json.dumps(post_data)

# Make the POST request
reponse = requests.get(url_get_all)
print(reponse)
