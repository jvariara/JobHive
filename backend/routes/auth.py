from flask import Blueprint, request, jsonify

auth_blueprint = Blueprint('auth_blueprint', __name__)

"""
front end will call this route when trying to sign in.
Take username and password credentials. Find the user in the table,
compare their password with the password saved in the table. If the user
does not exist, or the password is incorrect, return 'Incorrect username or password,
please try again'. If the user credentials is valid, create a session id cookie to
send back to the front end. This will be used for sequential sign-ins.
"""
@auth_blueprint.route('/sign-in')
def sign_in():
    print(request.url, request.method)
    return "sign_in"