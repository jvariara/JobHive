from flask import Blueprint, request, jsonify
from models.user import Users
from password_validator import PasswordValidator
from email_validator import validate_email
import jwt
import datetime
import os
from functools import wraps

auth_controller = Blueprint('auth_controller', __name__)

# TODO: MOVE TO .env FILE
SECRET_KEY=os.getenv('SECRET_KEY')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = data['sub']
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated
    

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
        if user and Users.check_password(user, req['password']):
            # Generate JWT
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), # token expires in 1 day
                'iat': datetime.datetime.utcnow(),
                'sub': user['username'] # User user identifier
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            res['status'] = 'success'
            res['token'] = token
        else:
            raise Exception("The username or password credentials are incorrect")
    except Exception as init:
        res['status'] = 'error'
        res['error'] = init.args[0]
    return jsonify(res)

@auth_controller.route('/register', methods=['POST'])
def register():
    req = request.json
    res = {
        'status': '',
        'error': '',
    }
    try:
        if not validate_password(req['password']):
            raise Exception("Please enter a valid password")
        elif not validate_username(req['username']):
            raise Exception("Please enter a valid username")
        elif not validate_email(req['email']):
            raise Exception("Please enter a valid email")
        elif Users.find_by_username(req['username']):
            raise Exception("The username you have entered has already been taken")
        elif Users.find_by_email(req['email']):
            raise Exception("The email you have entered has already been taken")
        new_user = Users(req['username'], 
                         req['email'],
                         req['password'])
        new_user.save()
        res['status'] = 'success'   
    except Exception as inst:
        res['status'] = 'error'
        res['error'] = inst.args[0]
    return jsonify(res)

def validate_password(password):  
    schema = PasswordValidator()
    schema.min(8) \
        .max(30) \
        .has().uppercase() \
        .has().lowercase() \
        .has().digits() \
        .has().no().spaces() \
        .has().symbols()
    
    return schema.validate(password)

def validate_username(username):
    schema = PasswordValidator()
    schema.min(5).max(20).has().no().symbols().has().no().spaces()
    return schema.validate(username)