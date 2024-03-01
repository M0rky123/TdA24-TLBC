#!/bin/sh

cd frontend

npm run dev &

cd ../backend
python3 -B -m flask --app app/app.py init-db &
python3 -B -m flask --app app/app.py run --debug --port=8080

