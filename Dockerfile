#!/bin/bash
# syntax=docker/dockerfile:1

FROM python:3.10-buster

WORKDIR /app

RUN pip install pipenv flask[async] flask_cors requests gunicorn

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs


COPY Pipfile .
COPY Pipfile.lock .

RUN pipenv install --system --deploy

COPY . .

RUN chmod +x start.sh
RUN npm install -g npm@10.4.0

EXPOSE 80
EXPOSE 8080

CMD ["./start.sh"]


