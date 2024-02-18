#!/bin/sh

cd frontend

npm run dev &

cd ../backend
python3 -m flask --app app/app.py init-db &
python3 -m flask --app app/app.py run --debug --port=8080

