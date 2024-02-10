from flask import Blueprint, request
from models.user import Users

auth_controller = Blueprint('auth_controller', __name__)

@auth_controller.route('/sign-in', methods=['POST'])
def sign_in():
    req = request.json
    res = {
        'sign-in': '',
        'error': ''
    }
    try:
        user = Users.find_by_username(username=req['username'])
        print(user)
        if user and Users.check_password(user, req['password']):
            res['sign-in'] = 'success'
        else:
            raise Exception("The username or password credentials are incorrect")
    except Exception as init:
        print("exception")
        res['sign-in'] = 'error'
        res['error'] = init.args[0]
        
    return res