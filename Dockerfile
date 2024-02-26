# syntax=docker/dockerfile:1

# Use Python base image
FROM python:3.10-buster

# Set the working directory
WORKDIR /

# Install Python dependencies using pipenv
# Ensure you copy the Pipfile and Pipfile.lock before running pipenv install
COPY Pipfile Pipfile.lock /
RUN pip install pipenv && pipenv install --system --deploy

# Install Node.js
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# Install Nginx
RUN apt-get install -y nginx

# Copy the source code (ensure you have .dockerignore set up to exclude unnecessary files)
COPY . .

# Install Node modules for the frontend and build the frontend
RUN cd frontend && npm install && npm run build

# Give execution rights to the start script
RUN chmod +x start.sh

# Copy Nginx configuration file (make sure to create this file in your project)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start command
ENTRYPOINT ["./start.sh"]
