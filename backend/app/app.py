import json
from flask import Flask, make_response, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from . import db
from .db import add_kantor, filter_kantor, get_all_tags, get_count, get, get_all, delete, get_locations, price_min_max, update, get_page
from .utils import get_admin_login, get_user_login, password_hash, api_verify, add_admin_to_db, remove_admin_from_db, time_index, user_verify, dc_log
from .reservations import check_day, check_month, make_reservation
from .profile import generate_ical, lecturer_reservations
from .logs import log

app = Flask(__name__, static_folder="static")
app.config['DATABASE'] = './app/data/lecture.db'
app.json.sort_keys = False

CORS(app)


db.init_app(app)

######## Fáze 1 ########

#@app.route('/')
#def hello_world():
#    return "Hello TdA"

@app.before_request
def before_request():
    headers_dict = dict(request.headers)
    headers_json = json.dumps(headers_dict, indent=4)
    json_data = json.dumps(request.json, indent=4) if request.json else None
    dc_log(f"**DEV** Incoming request to {request.path}", headers_json, json_data)

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
    log("info", "Request for creating new lecturer.")
    data = request.json
    success = get_admin_login(request.headers)
    log("info", "API request authorized.")
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
    page, status = get_page(page_number=offset, limit=int(limit))
    return page, status

@app.route('/api/lecturers/filter', methods=['POST'])
async def find_filtered():
    request_data = request.json
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
    success, lector_id, auth_key, message = get_user_login(name, password)
    if success:
        return jsonify({"lector_id": lector_id, "auth_key": auth_key}), 200
    else:
        return jsonify({"status": message}), 401
    
@app.route("/api/auth/check", methods=["POST"])
def check_auth():
    data = request.json
    lector_id = data.get('lector_id')
    auth_key = data.get('auth_key')
    success = user_verify(lector_id, auth_key)
    if success:
        return jsonify({"status": "OK"}), 200
    else:
        return jsonify({"status": "Unauthorized"}), 401

@app.route("/api/reserve/<lector_id>", methods=["POST"])
async def reserve(lector_id):
    data = request.json
    message, status = make_reservation(data, lector_id)
    print(message)
    return {"status": message}, status

@app.route("/api/reserve/<lector_id>", methods=["GET"])
async def get_reservations(lector_id):
    request_data = request.headers
    date = request_data.get("Reserved-Day")
    message = check_day(lector_id, date)
    return jsonify(message), 200

@app.route('/generate_ical', methods=['POST'])
def download_ical():
    request_data = request.json
    lecturer_id = request_data.get('lecturer_id')
    auth_token = request_data.get('auth_token')

    ical_data, status_code = generate_ical(lecturer_id, auth_token)
    
    if status_code == 200:
        response = make_response(ical_data)
        response.headers['Content-Disposition'] = 'attachment; filename=reservations.ics'
        response.headers['Content-Type'] = 'text/calendar'
        return response
    elif status_code == 204:
        return "", 204  # No Content
    else:
        return {"error": "Unauthorized"}, 401
    
@app.route('/api/lecturers/<lector_id>/reservations', methods=['GET'])
def get_lecturer_reservations(lector_id):
    message = lecturer_reservations(lector_id)
    return jsonify(message), 200

@app.route("/api/reservations/<lector_id>", methods=["GET"])
def get_reservations_by_month(lector_id):
    data = request.headers
    month = data.get("month")
    year = data.get("year") 
    message, status = check_month(lector_id, month, year)
    return message, status

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

if __name__ == '__main__':
    app.run()
