import datetime
import click
from flask import current_app, g, jsonify
from flask.cli import with_appcontext
import sqlite3
import uuid as uuidgen
import bcrypt
from .logs import log

from .utils import add_user_to_db, user_verify

CREATE_TAG_TABLE = """
CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag_name TEXT NOT NULL,
  tag_id TEXT NOT NULL
);
"""

CREATE_LECTURERS_TABLE = """
CREATE TABLE IF NOT EXISTS lecturers (
  uuid TEXT,
  title_before TEXT,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  last_name TEXT NOT NULL,
  title_after TEXT,
  picture_url TEXT,
  price INTEGER,
  location TEXT,
  claim TEXT,
  bio TEXT,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  tags TEXT,
  unavailable_days TEXT
);
"""

CREATE_ADMIN_TABLE = """ 
CREATE TABLE IF NOT EXISTS admins (
    name TEXT NOT NULL,
    password TEXT NOT NULL
);
"""

CREATE_USER_TABLE = """
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    auth_token TEXT NOT NULL,
    lector_id TEXT NOT NULL
);"""

CREATE_RESERVATION_TABLE = """
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reservation_id TEXT NOT NULL,
    lecturer_id TEXT NOT NULL,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    time_index INTEGER NOT NULL,
    online BOOLEAN NOT NULL,
    place TEXT,
    note TEXT,
    responded BOOLEAN NOT NULL,
    accepted BOOLEAN    
    );"""

INIT_DB_STATEMENTS = [CREATE_TAG_TABLE, CREATE_LECTURERS_TABLE, CREATE_ADMIN_TABLE, CREATE_USER_TABLE, CREATE_RESERVATION_TABLE]

# DONE: Refactor the functions, make function names more continual, delete useless comments, add comments to the code that make sense, don't fuck up what works


# Setup functions

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES,
            isolation_level=None 
        )
        g.db.row_factory = sqlite3.Row
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

def init_db():
    with get_db() as db:
        for statement in INIT_DB_STATEMENTS:
            db.executescript(statement)

@click.command('init-db')
@with_appcontext
def init_db_command():
    """
    Definujeme příkaz příkazové řádky
    """
    init_db()
    click.echo('Initialized the database.')


def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

# My magical functions, I've commited a lot of crimes when doing this. So please be kind when judging my backend (☞ ͡° ͜ʖ ͡°)☞

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d

def get_all():
    """
    This function returns all saved Lecturers in our database packed in a JSON
    """
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        connection.row_factory = dict_factory
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM lecturers")
        data = cursor.fetchall()
        for lector in data:
            lector.pop("id", None)
            lector["uuid"] = lector.pop("uuid", None)
            lector["last_name"] = lector.pop("last_name", None)
            lector["picture_url"] = lector.pop("picture_url", None)
            lector["location"] = lector.pop("location", None)
            lector["claim"] = lector.pop("claim", None)
            lector["bio"] = lector.pop("bio", None)
            lector["tags"] = eval(lector.pop("tags", None))
            lector["price_per_hour"] = lector.pop("price", None)
            lector["contact"] = {
                "telephone_numbers": eval(lector.pop("phone", [])),
                "emails": eval(lector.pop("email", []))
            }

            for key in lector.keys():
                if lector[key] is None:
                    lector[key] = ""
        return data

def get_page(page_number, limit=6):
    """
    This function returns a page of 6 (Can be changed with limit param) Lecturers in our database packed in a JSON
    """
    offset = (int(page_number) - 1) * limit

    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        connection.row_factory = dict_factory
        cursor = connection.cursor()
        
        cursor.execute(f"SELECT * FROM lecturers LIMIT {limit} OFFSET {offset}")
        data = cursor.fetchall()
        if data:
            lecturers = []
            for lector in data:
                lector.pop("id", None)
                lector["uuid"] = lector.pop("uuid", None)
                lector["last_name"] = lector.pop("last_name", None)
                lector["picture_url"] = lector.pop("picture_url", None)
                lector["location"] = lector.pop("location", None)
                lector["claim"] = lector.pop("claim", None)
                lector["bio"] = lector.pop("bio", None)
                lector["tags"] = eval(lector.pop("tags", None))
                lector["price_per_hour"] = lector.pop("price", None)
                lector["contact"] = {
                    "telephone_numbers": eval(lector.pop("phone", [])),
                    "emails": eval(lector.pop("email", []))
                }

                for key in lector.keys():
                    if lector[key] is None:
                        lector[key] = ""
                lecturers.append(lector)

            return lecturers, 200
        else:
            return {"message": "Page Empty"}, 204 

def get(uuid):
    """
    This returns a single lecturer from the database based of the uuid
    """
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        connection.row_factory = dict_factory
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM lecturers WHERE uuid = ?", (uuid,))
        data = cursor.fetchone()
        if data:
            data["price_per_hour"] = data.pop("price", None)
            data["tags"] = eval(data["tags"])
            data["contact"] = {
                "telephone_numbers": eval(data.pop("phone", [])),
                "emails": eval(data.pop("email", []))
            }
            return data, 200
        else: 
            return {'message': 'Not found'}, 404

def get_count():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT COUNT(*) FROM lecturers")
        data = cursor.fetchone()
        return data[0]

def price_min_max():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT MIN(price), MAX(price) FROM lecturers")
        data = cursor.fetchone()
        return {"min": data[0], "max": data[1]} 

def get_all_tags():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tags")
        return cursor.fetchall()
    
def get_locations():
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT DISTINCT location FROM lecturers")
        return cursor.fetchall()

def update(uuid, kantor_data):
    """
    This function is for updating lecturer data. This took me so fucking long (╯'□')╯︵ ┻━┻
    """
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()

        # Fetch existing data to update selectively
        cursor.execute("SELECT * FROM lecturers WHERE uuid=?", (str(uuid),))
        existing_data = cursor.fetchone()

        if existing_data:
            updated_values = {}
            for key in kantor_data.keys():                
                if key in ['title_before', 'first_name', 'middle_name', 'last_name', 'picture_url', 'title_after', 'price_per_hour', 'location', 'claim', 'bio', 'contact', 'tags']:
                    if kantor_data[key] is not None:
                        if key == 'tags':
                            new_tags = []
                            for tag in kantor_data["tags"]:
                                if isinstance(tag, dict):
                                    tag_name = tag.pop("name", None)
                                    if tag_name:
                                        new_tag = add_tag(tag_name)
                                        new_tags.append(new_tag)
                            tags = new_tags
                            updated_values['tags'] = str(tags)
                        elif key == 'contact':
                            if kantor_data[key]['telephone_numbers']:
                                updated_values['phone'] = str(kantor_data[key]['telephone_numbers'])
                            if kantor_data[key]['emails']:
                                updated_values['email'] = str(kantor_data[key]['emails'])
                        elif key == 'price_per_hour':
                            updated_values['price'] = kantor_data[key]
                        else:
                            updated_values[key] = kantor_data[key]
                    else:
                        updated_values[key] = None  

            # Generate SQL UPDATE query
            update_query = "UPDATE lecturers SET "
            update_values = []

            for key, value in updated_values.items():
                update_query += f"{key}=?, "
                update_values.append(value)

            update_query = update_query.rstrip(', ')  # Remove the trailing comma
            update_query += " WHERE uuid=?"

            # Add the UUID to the update values
            update_values.append(str(uuid))

            # Execute the update query
            cursor.execute(update_query, tuple(update_values))

            connection.commit()
            data, _= get(uuid)
            return jsonify(data), 200
        else:
            return {"status": "not found"}, 404
        
def update_reservation(reservation_id, data):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("UPDATE reservations SET responded = ?, accepted = ? WHERE reservation_id = ?", (True, data, reservation_id))
        connection.commit()
        return {"status": "updated"}, 200

def delete(uuid):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("DELETE FROM lecturers WHERE uuid = ?", (uuid,))
        connection.commit()

def add_tag(tag_name):
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM tags WHERE tag_name = ?", (tag_name,))

        tags = cursor.fetchone()
        if tags:
            data = {"name": tags[1], "uuid": tags[2]}
            return data
        else:
            uuid = str(uuidgen.uuid4())
            with sqlite3.connect(current_app.config['DATABASE']) as connection:
                cursor = connection.cursor()
                cursor.execute("INSERT INTO tags (tag_name, tag_id) VALUES (?, ?)", (tag_name, uuid))

            connection.commit()
            return {"name": tag_name, "uuid": uuid}
        
def add_kantor(data):
    uuid = data.get('uuid')
    if not uuid:
        uuid = str(uuidgen.uuid4())
        data['uuid'] = uuid
    title_before = data.get('title_before')
    first_name = data.get('first_name')
    middle_name = data.get('middle_name')
    last_name = data.get('last_name')
    title_after = data.get('title_after')
    picture_url = data.get('picture_url')
    location = data.get('location')
    claim = data.get('claim')
    bio = data.get('bio')
    price = data.get('price_per_hour')
    name = data.get('username')
    password = data.get('password')
    email = data.get('contact', {}).get('emails', [])
    phone = data.get('contact', {}).get('telephone_numbers', [])
    tags = data.get('tags', [])
    new_tags = []
    for tag in tags:
        if isinstance(tag, dict):
            tag_name = tag.pop("name", None)
            if tag_name:
                new_tag = add_tag(tag_name)
                new_tags.append(new_tag)
    tags = new_tags
    data['tags'] = tags

    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        cursor = connection.cursor()
        cursor.execute("INSERT INTO lecturers (title_before, first_name, middle_name, last_name, picture_url, title_after, price, location, claim, bio, email, phone, uuid, tags) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (title_before, first_name, middle_name, last_name, picture_url, title_after, price, location, claim, bio, str(email), str(phone), str(uuid), str(tags)))
        
    connection.commit()
    log("success", "New lecturer added to database.")

    add_user_to_db(name, password, uuid)

    return data, 200

def filter_kantor(filtered_tags=None, loc=None, min_max=None):
    tags = get_all_tags()
    tag_names = [tag[1] for tag in tags]
    
    with sqlite3.connect(current_app.config['DATABASE']) as connection:
        connection.row_factory = dict_factory
        cursor = connection.cursor()
        select_query = "SELECT * FROM lecturers WHERE "
        query_params = []

        if filtered_tags:
            select_query += "("
            for tag in filtered_tags:
                if tag in tag_names:
                    tag_query = "tags LIKE ? AND "
                    select_query += f"{tag_query}"
                    query_params.append(f"%{tag}%")
            if select_query.endswith(" AND "):
                select_query = select_query[:-5]
            select_query += ") AND "

        if loc:
            select_query += "("
            for location in loc:
                select_query += "location = ? OR "
                query_params.append(location)
            if select_query.endswith(" OR "):
                select_query = select_query[:-4]
            select_query += ") AND "
        if min_max:
            select_query += "price BETWEEN ? AND ? AND "
            query_params.append(min_max[0])
            query_params.append(min_max[1])

        if select_query.endswith(" AND "):
            select_query = select_query[:-5]

        query = cursor.execute(select_query, tuple(query_params))
        result = query.fetchall()

        if result:
            for lector in result:
                lector["uuid"] = lector.pop("uuid", None)
                lector["last_name"] = lector.pop("last_name", None)
                lector["picture_url"] = lector.pop("picture_url", None)
                lector["location"] = lector.pop("location", None)
                lector["claim"] = lector.pop("claim", None)
                lector["bio"] = lector.pop("bio", None)
                lector["tags"] = eval(lector.pop("tags", None))
                lector["price_per_hour"] = lector.pop("price", None)
                lector["contact"] = {
                    "telephone_numbers": eval(lector.pop("phone", [])),
                    "emails": eval(lector.pop("email", []))
                }

                for key in lector.keys():
                    if lector[key] is None:
                        lector[key] = ""

            return result
        else:
            return {"message": "No Lecturers found"}


# Some more setup magical shit ¯\_(ツ)_/¯

@click.command('init-db')
@with_appcontext
def init_db_command():
    init_db()
    click.echo('Initialized the database.')

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)


