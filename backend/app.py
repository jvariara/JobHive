from connect import connect
from flask import Flask, Blueprint
from flask_cors import CORS
from config import load_config
from dotenv import load_dotenv
import os

#start flask app
app = Flask(__name__)

#initialize CORS with default settings onto the flask applcation
CORS(app)

#load our environment variables
load_dotenv()

app.config['ENV'] = os.getenv('FLASK_ENV')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['DEBUG'] = os.getenv('DEBUG', False)
host = os.getenv('HOST', "localhost")
port = int(os.getenv('PORT', 8000))

#connect to our database using our config from database.ini and the config script
config=load_config()
connect(config)

# import blueprints for routing
from routes.auth import auth_blueprint


@app.route("/")
def hello_world():
    return "hello"

app.register_blueprint(auth_blueprint, url_prefix='/auth')

if __name__ == '__main__':
    app.run(port=port, host=host)