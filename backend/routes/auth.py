from flask import Blueprint, request, jsonify

auth_blueprint = Blueprint('auth_blueprint', __name__)

@auth_blueprint.route('/sign-in')
def sign_in():
    print(request.url, request.method)
    return "sign_in"