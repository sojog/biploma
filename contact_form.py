from flask import Flask, request, jsonify
from flask_wtf.csrf import CSRFProtect
from flask import render_template
import sqlite3
import re

# Initialize Flask app
app = Flask(__name__)

# Configure a secret key for CSRF protection
app.config['SECRET_KEY'] = '84yrf@$@tt45y5@*g4hR#J^&234wfv'

# Initialize CSRF protection
csrf = CSRFProtect(app)


# Database setup
def init_db():
    conn = sqlite3.connect('contact_form.db')
    conn.execute('''
    CREATE TABLE IF NOT EXISTS contact_form_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message_body TEXT NOT NULL
    )
    ''')
    conn.commit()
    conn.close()


# Call the database setup function
init_db()


@app.route('/contact_us')
def contact():
    return render_template('contact_us.html')

# Validation functions


def validate_name(name):
    return len(name) > 0 and len(name) < 100


def validate_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email) is not None


def validate_message(message):
    return len(message) > 0 and len(message) < 1000


# Form submission route
@app.route('/submit_contact_form', methods=['POST'])
def submit_contact_form():
    name = request.form.get('name')
    email = request.form.get('email')
    message_body = request.form.get('message')

    if not validate_name(name):
        return jsonify({"error": "Invalid name"}), 400
    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400
    if not validate_message(message_body):
        return jsonify({"error": "Invalid message"}), 400

    # Insert data into the database
    conn = sqlite3.connect('contact_form.db')
    cursor = conn.cursor()
    cursor.execute("INSERT INTO contact_form_entries (name, email, message_body) VALUES (?, ?, ?)",
                   (name, email, message_body))
    conn.commit()
    conn.close()

    return jsonify({"success": "Form submitted successfully!"})


if __name__ == '__main__':
    app.run(debug=True)
