from flask import Flask, render_template, url_for, request, jsonify
from datetime import datetime
import pyrebase

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/authors")
def authors():
    return render_template("authors.html")

@app.route("/procedure")
def procedure():
    return render_template("procedure.html")

@app.route("/results")
def results():
    return render_template("results.html")

@app.route("/test", methods=['GET', 'POST'])

def test():
    
    global config, userID, db, timestamp, key

    # POST request
    if request.method == 'POST':
        # Get time stamp to be used as a firebase node
        # Each data set will be stored under its own child node identified the timestamp
        timeStamp = datetime.now().strftime("%d-%m-%Y %H:%M:%S")

        # Receive Firebase configuration credentials
        config = request.get_json()
        userID = config.pop('userID')

        print('User ID: ' + userID, flush = True)   # Debug only
        print(config, flush = True)                 # Debug only

        # Initialize firebase connection
        firebase = pyrebase.initialize_app(config)

        # Create database object
        db = firebase.database()

        # Write sample data to FB to test connection
        db.child('user/' + userID + '/data/' + '/' + timeStamp).update({'testKey':'testValue'})

        return 'Data Uploaded', 200
    
    else:
        
        return "Success"
    
if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5001)