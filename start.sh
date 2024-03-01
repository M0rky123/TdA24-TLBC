#!/bin/sh

# Start the frontend on a specific port
cd frontend
export FRONTEND_PORT=3000
npm run start &

# Start the backend on a different port
cd ../backend
python3 -m flask --app app/app.py init-db
gunicorn --bind 127.0.0.1:5000 app.app:app &

# Start Nginx in the foreground
nginx -g 'daemon off;'