from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_session import Session
from datetime import datetime
from config import ApplicationConfig
from models import db, User, DiaryEntry

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)  # Enable CORS for all routes
server_session = Session(app)
db.init_app(app)

def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

with app.app_context():
    db.create_all()

@app.route("/")
def get_current_user():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

@app.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "username": new_user.username,
        "email": new_user.email
    }), 201

@app.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid input"}), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    user = User.query.filter_by(email=email).first()

    if user is None or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id", None)
    return '', 200

@app.route("/diary", methods=["POST"])
def add_diary_entry():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    if not data or 'date' not in data or 'text' not in data:
        return jsonify({"error": "Invalid input"}), 400

    date = datetime.strptime(data['date'], '%Y-%m-%d').date()
    text = data['text']

    new_entry = DiaryEntry(user_id=user_id, date=date, text=text)
    db.session.add(new_entry)
    db.session.commit()

    return jsonify({
        "id": new_entry.id,
        "date": new_entry.date,
        "text": new_entry.text
    }), 201

@app.route("/diary", methods=["GET"])
def get_diary_entries():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    entries = DiaryEntry.query.filter_by(user_id=user_id).order_by(DiaryEntry.date.desc()).all()
    return jsonify([{
        "id": entry.id,
        "date": entry.date,
        "text": entry.text
    } for entry in entries])


@app.route("/diary/<entry_id>", methods=["PUT"])
def edit_diary_entry(entry_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    entry = DiaryEntry.query.filter_by(id=entry_id, user_id=user_id).first()
    if not entry:
        return jsonify({"error": "Entry not found"}), 404

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Invalid input"}), 400

    text = data['text']

    entry.text = text
    db.session.commit()

    return '', 204


@app.route("/diary/<entry_id>", methods=["DELETE"])
def delete_diary_entry(entry_id):
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    entry = DiaryEntry.query.filter_by(id=entry_id, user_id=user_id).first()
    if not entry:
        return jsonify({"error": "Entry not found"}), 404

    db.session.delete(entry)
    db.session.commit()
    return '', 204

# New route to change username
@app.route("/change-username", methods=["PUT"])
def change_username():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()
    if not data or 'username' not in data:
        return jsonify({"error": "Invalid input"}), 400

    new_username = data['username']
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    # Check if the new username is already taken
    existing_user = User.query.filter_by(username=new_username).first()
    if existing_user:
        return jsonify({"error": "Username already exists"}), 409

    user.username = new_username
    db.session.commit()

    return jsonify({"success": True})

# New route to delete account
@app.route("/delete-account", methods=["DELETE"])
def delete_account():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Delete user's diary entries
    DiaryEntry.query.filter_by(user_id=user_id).delete()

    # Delete the user
    db.session.delete(user)
    db.session.commit()

    session.pop("user_id", None)

    return jsonify({"message": "User account deleted successfully"}), 200

if __name__ == "__main__":
    app.run(debug=True)