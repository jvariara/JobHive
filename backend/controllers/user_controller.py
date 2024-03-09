from flask import Blueprint, request, jsonify, make_response
from .middleware import token_required
from models.user import Users

user_controller = Blueprint('user_controller', __name__)

@user_controller.route('/<id>', methods=['PATCH'])
@token_required
def edit_profile(current_user, id):
    try:
        user = Users.find_by_id(id=id)
        print(user)
        if user:
            data = request.get_json()
            updated_username = data['username']
            user_with_updated_username = Users.find_by_username(username=updated_username)
            if user_with_updated_username:
                return make_response(jsonify({'message': 'Username already exists.'}), 409)
            user.username = updated_username
            user.display_name = data['display_name']
            user.update()
            return make_response(jsonify({'message': 'User successfully updated!', 'username': updated_username}), 200)
        return make_response(jsonify({'message': 'User not found'}), 404)
    except Exception as e:
        return make_response(jsonify({'message': 'Error updating user', 'error': str(e)}), 500)