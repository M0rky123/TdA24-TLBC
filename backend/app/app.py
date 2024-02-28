import json
from flask import Flask, make_response, render_template, request, jsonify
from flask_cors import CORS
from . import db
from .db import add_kantor, check_day, filter_kantor, get_all_tags, get_count, get, get_all, delete, get_locations, make_reservation, price_min_max, update, get_page
from .utils import get_admin_login, get_user_login, password_hash, api_verify, add_admin_to_db, remove_admin_from_db, time_index

app = Flask(__name__, static_folder="static")
app.config['DATABASE'] = './app/data/lecture.db'
app.json.sort_keys = False

CORS(app, resources={r"/api/*": {"origins": "*"}})

db.init_app(app)

######## Fáze 1 ########

#@app.route('/')
#def hello_world():
#    return "Hello TdA"

@app.route('/api')
def api():
    return {"secret":"The cake is a lie"}

def validate_required_fields(data):
    required_fields = ['first_name', 'last_name', 'contact']
    for field in required_fields:
        if data.get(field) is None:
            return False
    contact_info = data.get('contact', {})
    if not contact_info.get('emails') or not contact_info.get('telephone_numbers'):
        return False
    return True


########### API ###########

@app.route('/api/lecturers', methods=['POST'] )
async def createlec():
    data = request.json
    success = get_admin_login(request.headers)
    
    if success:
        if not validate_required_fields(data):
            return jsonify({"error": "Missing required fields"}), 400
        
        data, status = add_kantor(data)

        return data, status

    else:
        return jsonify({"error": "Unauthorized"}), 401

@app.route('/api/lecturers', methods=['GET'] )
async def getalllec():
    return get_all()
    
@app.route('/api/lecturers/<lector_id>', methods=['GET'])
async def getlec(lector_id):
    data, status = get(lector_id)
    return data, status

@app.route('/api/lecturers/<lector_id>', methods=['DELETE'])
async def deletelec(lector_id):
    success = get_admin_login(request.headers)
    
    if success:
        _, status = get(lector_id)
        if status == 200:
            delete(lector_id)
            return {"status": "deleted"}, status
        else:
            return {"status": "not found"}, 404
    else:
        return jsonify({"error": "Unauthorized"}), 401

@app.route('/api/lecturers/<lector_id>', methods=['PUT'])
def updatelec(lector_id):
    success = get_admin_login(request.headers)
    
    if success:
        request_data = request.json
        data, status = get(lector_id)
        if status == 200:
            updated_data, status = update(lector_id, request_data)
            return updated_data, status
        else:
            return jsonify(data), status
    else:
        return jsonify({"error": "Unauthorized"}), 401

@app.route('/api/lecturers/main/<offset>', methods=['GET'])
async def getsixlec(offset):
    request_data = request.headers
    limit = request_data.get("limit")
    print(limit)
    page, status = get_page(page_number=offset, limit=int(limit))
    print(page)
    return page, status

@app.route('/api/lecturers/filter', methods=['POST'])
async def find_filtered():
    request_data = request.json
    print(request_data)
    loc = request_data.get("loc", None)
    tag = request_data.get("tag", None)
    min_max = request_data.get("min_max", None)
    if loc or tag or min_max:
        data = filter_kantor(tag, loc, min_max)
        return jsonify(data)
    else:
        return jsonify({"error": "At least one of 'loc' or 'tag' parameters is required."}), 400
    

@app.route('/api/lecturers/metadata', methods=['GET'])
def misc():
    # data = get_all()
    count = get_count()
    min_max = price_min_max()
    location = get_locations()
    existing_tags = get_all_tags()

    # return jsonify({"data": data, "count": count, "min_max": min_max, "location": location, "existing_tags": existing_tags})
    return jsonify({"count": count, "min_max": min_max, "location": location, "existing_tags": existing_tags})


########### Soutěžní kolo ###########
@app.route("/api/auth", methods=["POST"])
def auth():
    data = request.json
    name = data.get('name')
    password = data.get('password')
    success = get_user_login(name, password)
    if success:
        return jsonify({"status": "success"}), 200
    else:
        return jsonify({"status": "failed"}), 401

@app.route("/api/reserve/<lector_id>", methods=["POST"])
def reserve(lector_id):
    client_data = request.json
    client_name = client_data.get('name')
    client_email = client_data.get('email')
    client_phone = client_data.get('phone')
    date = client_data.get('date')
    time = client_data.get('time')
    index = time_index(time)
    online = client_data.get('online')
    place = client_data.get('place', None)
    note = client_data.get('note', None)
    message, status = make_reservation(lector_id, client_name, client_email, client_phone, date, time, index, online, place, note)
    return jsonify({"status": message}), status


app.route("/api/reserve/<lector_id>", methods=["GET"])
def get_reservations(lector_id):
    request_data = request.headers
    date = request_data.get("date")
    check_day(date)
########### Debug ###########

@app.route('/api/admin', methods=['POST'])
def admin():
    data = request.json
    name = data.get('name')
    password = data.get('password')
    hashed_password = password_hash(password)
    add_admin_to_db(name, hashed_password)
    return jsonify({"status": "created"}), 201

@app.route('/api/admin', methods=['DELETE'])
def delete_admin():
    remove_admin_from_db()
    return jsonify({"status": "deleted"})

@app.route('/api/admin', methods=['GET'])
def test_admin():
    data = get_admin_login(request.headers)
    return jsonify({"status": data})

########### FrontEnd ###########

""" @app.route('/', methods=['GET'])
def main():
    data = get_all()
    count = get_count()
    min_max = price_min_max()
    location = get_locations()
    existing_tags = get_all_tags()
    print(json.dumps(existing_tags))
    return render_template("index.html", data = data, count = count, min_max = min_max, existing_tags = existing_tags, location = location)
 """
""" @app.route('/lecturer')
def lecturer():
    with open("./app/data/lecturer.json", "r") as file:
        data = json.load(file)

    return render_template("lecturer.html", lecturer=data) """


@app.route('/lecturer/<lector_id>', methods=['GET'])
def showlec(lector_id):
    data, status = get(lector_id)
    if status == 200: 
        return render_template("lecturer.html", lecturer=data)
    else: 
        return render_template("404.html", lecturer=lector_id)


if __name__ == '__main__':
    app.run()
