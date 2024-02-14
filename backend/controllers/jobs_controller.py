from flask import Blueprint, request, jsonify
from models.jobs import Jobs

jobs_controller = Blueprint('jobs_controller', __name__)

def get_internships():
    pass

def get_fulltime():
    pass

def get_all():
    pass

@jobs_controller.route('', methods=['GET'])
def get_jobs():
    job_type = request.args.get('type')
    
    jobs = {}
    if job_type == "internship":
        jobs = get_internships()
    elif job_type == "fulltime":
        pass
    else:
        pass
    
    return