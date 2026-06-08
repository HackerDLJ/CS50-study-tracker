import os
from cs50 import SQL
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///project.db")

@app.route("/")
def index():
    # Get total study time to show on dashboard
    total = db.execute("SELECT SUM(minutes) AS total_mins FROM logs")[0]["total_mins"]
    if total is None:
        total = 0
    return render_template("index.html", total=total)

@app.route("/add", methods=["POST"])
def add():
    # Get data from the HTML form
    subject = request.form.get("subject")
    minutes = request.form.get("minutes")
    notes = request.form.get("notes")

    # Insert data into SQL
    if subject and minutes:
        db.execute("INSERT INTO logs (subject, minutes, notes) VALUES (?, ?, ?)",
                   subject, minutes, notes)

    return redirect("/")

@app.route("/history")
def history():
    # Fetch all logs to show in a table
    rows = db.execute("SELECT * FROM logs ORDER BY date DESC")
    return render_template("history.html", rows=rows)
