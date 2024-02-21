#!/bin/sh



# Start the frontend build process
cd ./frontend
npm install
npm run build 
npm run start &

# Move back to the backend directory
cd ../backend

# Initialize the database in the background
python3 -m flask --app app/app.py init-db &

# Run Flask using Gunicorn in the foreground to keep the container alive
gunicorn --bind 0.0.0.0:80 app.app:app 