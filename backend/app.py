from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import load_string
from dotenv import load_dotenv
import os
from flask_cors import CORS
from models.user import init_app



def app_obj():
    
    app = Flask(__name__)

    conn_str = load_string()

    app.config['SQLALCHEMY_DATABASE_URI'] = conn_str

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    #load our environment variables
    load_dotenv()

    app.config['ENV'] = os.getenv('FLASK_ENV')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['DEBUG'] = os.getenv('DEBUG', False)
        
    CORS(app)
    
    return app

if __name__ == '__main__':
    host = os.getenv('HOST', "localhost")
    port = int(os.getenv('PORT', 8000))
    app = app_obj()
    init_app(app)
    
    from controllers.authorize import auth_controller

    app.register_blueprint(auth_controller, url_prefix='/auth')

    app.run(port=port, host=host, debug=True)