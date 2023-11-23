import sqlite3
import hashlib

conn = sqlite3.connect('userdata.db')
cur = conn.cursor()

cur.execute(""" CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
            )
            """)

username1, email1, password1 = "mike", "mike@email.com", hashlib.sha256(
    "alpha123".encode()).hexdigest()
username2, email2, password2 = "john", "john@email.com", hashlib.sha256(
    "bravo234".encode()).hexdigest()
username3, email3, password3 = "samuel", "samuel@email.com", hashlib.sha256(
    "charlie345".encode()).hexdigest()
username4, email4, password4 = "dwight", "dwight@email.com", hashlib.sha256(
    "delta456".encode()).hexdigest()

cur.execute("SELECT COUNT(*) FROM users")
if cur.fetchone()[0] == 0:
    cur.execute("INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
                (username1, email1, password1))
    cur.execute("INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
                (username2, email2, password2))
    cur.execute("INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
                (username3, email3, password3))
    cur.execute("INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
                (username4, email4, password4))
conn.commit()
conn.close()
