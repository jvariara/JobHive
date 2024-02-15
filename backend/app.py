from flask import Flask
from config import load_string
from dotenv import load_dotenv
import os
from flask_cors import CORS
from db import init_app
from scripts.seed import create_job



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
        
    CORS(app, supports_credentials=True, resources={r"/auth/*": {"origins": "http://localhost:3000"}})
        
    return app

if __name__ == '__main__':
    host = os.getenv('HOST', "localhost")
    port = int(os.getenv('PORT', 8000))
    app = app_obj()
    init_app(app)
        
    from controllers.authorize import auth_controller
    
    from controllers.jobs_controller import jobs_controller

    app.register_blueprint(auth_controller, url_prefix='/auth')
    
    app.register_blueprint(jobs_controller, url_prefix='/jobs')
    
    #run seeding scripts here
    # with app.app_context():
    #     create_job()

    app.run(port=port, host=host, debug=True)