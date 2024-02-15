from flask import Blueprint, request, jsonify
from models.jobs import Jobs

jobs_controller = Blueprint('jobs_controller', __name__)

@jobs_controller.route('', methods=['GET'])
def get_jobs():
    job_type = request.args.get('type')
    
    jobs = {}
    match job_type:
        case "internship":
            jobs = Jobs
        case "fulltume":
            jobs = get_fulltime()
        case _:
            jobs = get_all()
    
    return jobs