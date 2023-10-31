from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
jwt = JWTManager(app)
CORS(app)

@app.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None) 
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/journal'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class Journals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    headline = db.Column(db.String(100))
    details = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)

    # def __repr__(self):
    #     return f"{self.headline} ({self.date})"

    def __init__(self, headline, details):
        self.headline = headline
        self.details = details

class JournalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'headline', 'details', 'date')

journal_schema = JournalSchema()
journals_schema = JournalSchema(many=True)

@app.route('/journal/write', methods = ['Post'])
def write_journal():
    headline = request.json['headline']
    details = request.json['details']

    journals = Journals(headline, details)
    db.session.add(journals)
    db.session.commit()
    return journal_schema.jsonify(journals)

@app.route('/journal', methods = ['GET'])
def get_journals():
    all_journals = Journals.query.all()
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


@app.route('/', methods = ['GET'])
def home():
    return jsonify({"Hello":"world"})

if __name__ == "__main__":
    app.run(debug=True)


     