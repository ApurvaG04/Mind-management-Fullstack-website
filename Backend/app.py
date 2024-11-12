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
from bs4 import BeautifulSoup
import pandas as pd
import time
import requests
from urllib.request import urlopen
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['PERMANENT_SESSION_LIFETIME'] =  timedelta(minutes=120)
jwt = JWTManager(app)
CORS(app)

print("MYSQLUSER:", os.environ.get('MYSQLUSER'))
print("MYSQLPASSWORD:", os.environ.get('MYSQLPASSWORD'))
print("MYSQLHOST:", os.environ.get('MYSQLHOST'))
print("MYSQLPORT:", os.environ.get('MYSQLPORT'))
print("MYSQLDATABASE:", os.environ.get('MYSQLDATABASE'))


user=os.environ.get('MYSQLUSER')
password=os.environ.get('MYSQLPASSWORD')
host=os.environ.get('MYSQLHOST')
port = os.environ.get('MYSQLPORT')
database=os.environ.get('MYSQLDATABASE')


app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{user}:{password}@{host}:3306/{database}"
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
    email = db.Column(db.String(150))
    headline = db.Column(db.String(100))
    details = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    emotions = db.Column(db.Text())

    def __init__(self, user, headline, details, emotions):
        self.user = user
        self.headline = headline
        self.details = details
        self.emotions = emotions
        


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

    return jsonify({"message":"Account successfully created", "email":email_}), 200


@app.route("/logout")
def logout():
    if "email" in session:
        session.pop("email", None)
    return jsonify({"message":"You are successfully logged out"})

#---------------------------------------------------- Journal------------------------------------------------------------
class JournalSchema(ma.Schema):
    class Meta:
        fields = ('id', 'userEmail', 'headline', 'details', 'date', 'emotions')

journal_schema = JournalSchema()
journals_schema = JournalSchema(many=True)

@app.route('/journal/write', methods = ['Post'])
def write_journal():
    email = request.json['userEmail']
    headline = request.json['headline']
    details = request.json['details']   
    emotions = emotion_tracker(headline, details)
    journals = Journals(email, headline, details, emotions)
    db.session.add(journals)
    db.session.commit()
    return journal_schema.jsonify(journals)

def emotion_tracker(headline, details):
    url = "https://twinword-emotion-analysis-v1.p.rapidapi.com/analyze/"
    payload = { "text": headline + " " + details }
    headers = {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "2b7110fff0msh11ce59b9a7cc739p1cd368jsn119c9f0fde47",
        "X-RapidAPI-Host": "twinword-emotion-analysis-v1.p.rapidapi.com"
    }

    response = requests.post(url, data=payload, headers=headers)
    print(response)
    response = response.json()
    emotion = response['emotions_detected']
    if type(emotion)== list:
        result = ", ".join(emotion)
    return result

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
    emotions = emotion_tracker(headline, details)   
    journal.headline = headline
    journal.details = details   
    journal.emotions = emotions
    db.session.commit()
    return journal_schema.jsonify(journal)

@app.route('/journal/delete/<id>', methods = ['DELETE'])
def delete_journal(id):
    journal = Journals.query.get(id)
    db.session.delete(journal)
    db.session.commit()
    return journal_schema.jsonify(journal)

@app.route('/affirmation', methods = ['GET'])
def Affirmations():
    url = "https://positivity-tips.p.rapidapi.com/api/positivity/quote"

    headers = {
        "X-RapidAPI-Key": "2b7110fff0msh11ce59b9a7cc739p1cd368jsn119c9f0fde47",
        "X-RapidAPI-Host": "positivity-tips.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers)
    affirmation = response.json()
    return affirmation

@app.route('/readings', methods = ['GET']) 
async def Readings():
    topics = ['Anxiety-Disorders', 'Attention-Deficit-Hyperactivity-Disorder-ADHD', 'Autism-Spectrum-Disorders-ASD', 'Bipolar-Disorder', 'Borderline-Personality-Disorder', 'Depression', 'Eating-Disorders', 'Obsessive-Compulsive-Disorder-OCD', 'Post-Traumatic-Stress-Disorder-PTSD', 'Schizophrenia']
    topics_content = []
    articles = []
    
    for i in topics:
        url = "https://www.nimh.nih.gov/health/topics/"+i
        html = requests.get(url)
        soup = BeautifulSoup(html.content, "html.parser")
        paragraph = []
        for row in soup.select('.mobile-collapse div'):    
            lines = row.get_text()
            paragraph.append(lines)
        if i == "Obsessive-Compulsive-Disorder-OCD":
                for row in soup.select('.mobile-collapse'):
                    lines = row.get_text()
                    paragraph.append(lines)
        print(paragraph)
        topics_content.append(paragraph)
    print(topics_content)
    for row in range(len(topics)):
        articles.append([topics[row], topics_content[row]])
    return articles


@app.route('/readings/<topics>', methods = ['GET']) 
async def Readings_articles(topics):
    url = "https://www.nimh.nih.gov/health/topics/"+topics
    article = []
    heading = []
    para = []
    html = requests.get(url)
    soup = BeautifulSoup(html.content, 'html.parser')
    # title_id = soup.select('#block-nimhtheme-page-title')
    # title = title_id.get_text()
    # article.append(title)
    for i in soup.select('div', {'data-fieldname': 'field_anchor_links'}):
        for j in i.select('.box_section'):
            content = j.get_text()
            k = (content.rstrip().split('?'))
            k[0] = k[0] + "?"
            para.append(k)
        break
    # for row in range(len(heading)):
    #     article.append([heading[row], para[row]])
        
    return para
        # article.append(paragraph)
   

@app.route('/meditation', methods = ['GET']) 
def Meditation():
    url = "https://v1.nocodeapi.com/apurva224/spotify/nwQLiGFKCEXdWTbr/search?q=meditation&type=track"
    params = {}
    r = requests.get(url = url, params = params) #headers=headersAPI
    result = r.json()
    return result



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000)


     