from flask import Blueprint, request
from models.user import Users
from password_validator import PasswordValidator

auth_controller = Blueprint('auth_controller', __name__)

@auth_controller.route('/sign-in', methods=['POST'])
def sign_in():
    req = request.json
    res = {
        'status': '',
        'error': ''
    }
    try:
        user = Users.find_by_username(username=req['username'])
        print(user)
        if user and Users.check_password(user, req['password']):
            res['status'] = 'success'
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