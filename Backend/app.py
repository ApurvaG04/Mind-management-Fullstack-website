from flask import Flask, jsonify, request, session
from datetime import timedelta
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, JWTManager, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=120)
jwt = JWTManager(app)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/journal'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
ma = Marshmallow(app)

# Databases
def get_uuid():
    return uuid4().hex

class User(db.Model):
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(150))    
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class Journals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(150))
    headline = db.Column(db.String(100))
    details = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, user, headline, details):
        self.user = user
        self.headline = headline
        self.details = details
        


@app.route('/', methods = ['GET'])
def home():
    if 'email' in session:
        email = session['email']
        return email
    else:
        return None
        # return jsonify({"message":"Please login"}), 401

@app.route("/login", methods=["POST"])
def login():
    email_ = request.json["email"]
    password_ = request.json["password"]
    if email_ and password_:
        user = User.query.filter_by(email=email_).first() 
        if user is None:
            return jsonify({"error": "User does not exist"}), 401
      
        if not bcrypt.check_password_hash(user.password, password_):
            return jsonify({"error": "Unauthorized"}), 400
        else:
            session["email"] = user.email            
            return jsonify({"message":"You are logged in successfully", "name":user.name}), 200        
    else:
        return jsonify({"message":"Invalid credentials"}), 400
       

@app.route("/signup", methods=["POST"])
def signup():
    name_ = request.json["name"]
    email_ = request.json["email"]
    password_ = request.json["password"]

    user_exists = User.query.filter_by(email=email_).first() is not None

    if user_exists:
        return jsonify({"error":"User already exists"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password_)
    new_user = User(name = name_, email=email_, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message":"Account successfully created", "email":email_})


@app.route("/logout")
def logout():
    if "email" in session:
        session.pop("email", None)
    return jsonify({"message":"You are successfully logged out"})

#---------------------------------------------------- Journal------------------------------------------------------------
class JournalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userEmail', 'headline', 'details', 'date')

journal_schema = JournalSchema()
journals_schema = JournalSchema(many=True)

@app.route('/journal/write', methods = ['Post'])
def write_journal():
    user = request.json['userEmail']
    headline = request.json['headline']
    details = request.json['details']   

    journals = Journals(user, headline, details)
    db.session.add(journals)
    db.session.commit()
    return journal_schema.jsonify(journals)

@app.route('/journal', methods = ['POST'])
@cross_origin()
def get_journals():
    user = request.json['userEmail']
    all_journals = Journals.query.filter_by(user=user)
    results = journals_schema.dump(all_journals)
    return jsonify(results)

@app.route('/journal/<id>', methods = ['GET'])
def get_each_journal(id):
    journal = Journals.query.get(id)
    return journal_schema.jsonify(journal)

@app.route('/journal/update/<id>', methods = ['PUT'])
def update_journal(id):
    journal = Journals.query.get(id)
    headline = request.json['headline']
    details = request.json['details']
    journal.headline = headline
    journal.details = details        
    db.session.commit()
    return journal_schema.jsonify(journal)

@app.route('/journal/delete/<id>', methods = ['DELETE'])
def delete_journal(id):
    journal = Journals.query.get(id)
    db.session.delete(journal)
    db.session.commit()
    return journal_schema.jsonify(journal)



if __name__ == "__main__":
    app.run(debug=True)


     