from flask import Blueprint, request, jsonify
from models.jobs import Jobs

jobs_controller = Blueprint('jobs_controller', __name__)

