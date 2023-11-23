import sqlite3
import hashlib
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return app.send_static_file('login.html')


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    password = hashlib.sha256(password.encode()).hexdigest()

    conn = sqlite3.connect('userdata.db')
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?", (username, password))

    if cur.fetchone():
        return jsonify({"success": True, "message": "Login Successful!"})
    else:
        return jsonify({"success": False, "message": "Login FAILED!"}), 401


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    password = hashlib.sha256(password.encode()).hexdigest()

    conn = sqlite3.connect('userdata.db')
    cur = conn.cursor()

    # Check if user already exists
    cur.execute("SELECT * FROM users WHERE username = ?", (username,))
    if cur.fetchone():
        return jsonify({"success": False, "message": "Username already exists!"}), 409

    cur.execute("SELECT * FROM users WHERE email = ?", (email,))
    if cur.fetchone():
        return jsonify({"success": False, "message": "Email already registered!"}), 409

    # Insert new user
    try:
        cur.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)", (username, email, password))
        conn.commit()
        return jsonify({"success": True, "message": "User registered successfully!"})
    except sqlite3.Error as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)
