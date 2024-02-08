from connect import connect
from flask import Flask, Blueprint
from config import load_config
from dotenv import load_dotenv
import os

#start flask app
app = Flask(__name__)

#load our environment variables
load_dotenv()

app.config['ENV'] = os.getenv('FLASK_ENV')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['DEBUG'] = os.getenv('DEBUG', False)
app.config['HOST'] = os.getenv('HOST')
app.config['PORT'] = os.getenv('PORT')

#connect to our database using our config from database.ini and the config script
config=load_config()
connect(config)

# base route
@app.route("/")
def hello_world():
    return "hello"

if __name__ == '__main__':
    app.run()