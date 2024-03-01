import random
from flask import jsonify
import requests
import json

url = "http://127.0.0.1:8080/api/reserve/ae860d28-4f97-4630-9df6-8df70c5b3a1b"
url_get_all = "http://127.0.0.1:5000/api/lecturers"
#url = "http://f7b5d5a152c395f1.app.tourdeapp.cz/api/lecturers/999a8b5f-8dda-4ba8-8a15-21df6110f573"
#Need to force commit lol

first_names = ["Emma", "Liam", "Olivia", "Noah", "Ava", "Isabella", "Sophia", "Jackson", "Mia", "Lucas", "Oliver", "Amelia", "Evelyn", "Benjamin", "Harper", "Elijah", "Aiden", "Aria", "Caden", "Zoe", "Charlotte", "Mason", "Ella", "Carter", "Lily", "Grace", "Ethan", "Alexander", "Sebastian", "Mila", "Layla", "Nora", "Scarlett", "Zachary", "Chloe", "Liam", "Madison", "Henry", "Avery", "Jackson", "Ella", "Abigail", "Caleb", "Victoria", "Eli", "Penelope", "Hudson", "Stella", "Lillian"]

def generate_random_reservation():
    return {
        "name": f"{random.choice(first_names)}",
        "email": "asdjbnasjdbasjdbasdjdbaskjdkajdwbkajsdna.cernik@gmail.com",
        "phone": "666999000",
        "date": f"{random.randint(1, 30)}.05.2024",
        "time": f"{random.randint(8, 19)}:00",
        "online": True,
        "note": "Test"
    }


for i in range(10):
    data = generate_random_reservation()
    print(type(data))


    response_post = requests.post(url, json=data, headers={"Content-Type": "application/json"})
    print("POST Response:")
    print(response_post.status_code)
    print(type(response_post.text))
    print(response_post.text)