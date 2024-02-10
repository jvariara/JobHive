from flask import Blueprint, request, jsonify
from models.user import Users
from password_validator import PasswordValidator
import jwt
import datetime

auth_controller = Blueprint('auth_controller', __name__)

# TODO: MOVE TO .env FILE
SECRET_KEY="secret_key"

@auth_controller.route('/sign-in', methods=['POST'])
def sign_in():
    req = request.json
    res = {
        'status': '',
        'error': '',
        'token': None
    }
    try:
        user = Users.find_by_username(username=req['username'])
        print(user)
        if user and Users.check_password(user, req['password']):
            # Generate JWT
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), # token expires in 1 day
                'iat': datetime.datetime.utcnow(),
                'sub': user.username # User user identifier
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            res['status'] = 'success'
            res['token'] = token.decode('UTF-8')
        else:
            raise Exception("The username or password credentials are incorrect")
    except Exception as init:
        print("exception")
        res['status'] = 'error'
        res['error'] = init.args[0]
        
    return res

@auth_controller.route('/register', methods='POST')
def register():
    req = request.json
    res = {
        'status': '',
        'error': '',
    }
    try:
        if not validate_password(req['password']):
            raise Exception("Your password must contain")
        pass
    except Exception:
        pass

def validate_password(password):  
    schema = PasswordValidator()
    schema.min(8) \
        .max(10) \
        .has().uppercase() \
        .has().lowercase() \
        .has().digits() \
        .has().no().spaces() \
        .has().symbols()
    
    return schema.validate(password)