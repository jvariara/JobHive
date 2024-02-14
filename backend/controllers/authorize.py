import json
from flask import Blueprint, request, jsonify, make_response
from models.user import Users
from password_validator import PasswordValidator
from email_validator import validate_email
import jwt
import datetime
import os
from functools import wraps
from .middleware import token_required

auth_controller = Blueprint('auth_controller', __name__)

SECRET_KEY=os.getenv('SECRET_KEY')

@auth_controller.route('/sign-in', methods=['POST'])
def sign_in():
    req = request.json
    try:
        user = Users.find_by_username(username=req['username'])
        if user and Users.check_password(user, req['password']):
            # Generate JWT
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1), # token expires in 1 day
                'iat': datetime.datetime.utcnow(),
                'sub': user.id # Unique user identifier
            }
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            response = make_response(jsonify({'status': 'success', 'token': token }))
            response.set_cookie('auth_token', token, httponly=True, secure=True, samesite='Lax')
            return response
        else:
            raise Exception("The username or password credentials are incorrect")
    except Exception as init:
        return jsonify({ 'status': 'error', 'error': init.args[0] }), 401

@auth_controller.route('/register', methods=['POST'])
def register():
    req = request.json
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
        return jsonify({'status': 'success', 'message': 'User registered successfully'}), 201
    except Exception as init:
        return jsonify({ 'status': 'error', 'error': init.args[0] }), 400

@auth_controller.route('/logout', methods=['GET'])
def logout():
    response = make_response(jsonify({'status': 'success', 'message': 'Logged out successfully'}))
    response.set_cookie('auth_token', '', expires=0)
    return response

@auth_controller.route('/get-session', methods=["GET"])
@token_required
def get_user_session(current_user):
    user = Users.find_by_id(id=current_user)
    if user:
        return jsonify({ 'user': user.to_dict()})
    else:
        return jsonify({ 'error': "User not found" }), 404

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
