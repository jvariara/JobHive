from flask import Blueprint, request, jsonify
from models.jobs import Jobs

jobs_controller = Blueprint('jobs_controller', __name__)

@jobs_controller.route('', methods=['GET'])
def get_jobs():
    role = request.args.get('type')
    try:
        jobs=Jobs.get_jobs(role)
    except Exception as init:
        print(init.args[0])
        return jsonify({'message' : 'There was an error querying for this role of jobs.'})
    
    return jobs

@jobs_controller.route('create', methods=['POST'])
def create_job():
    req = request.json
    
    try:
        new_job = Jobs(company=req['company'], \
                        title=req['title'], \
                        location=req['location'], \
                        role=req['role'], \
                        url=req['url'])
        new_job.save()
    except Exception as init:
        print(init.args[0])
        return jsonify({'message' : 'There was an error saving your new job. Maybe there was a bad request, or an issue with the constructor'}), 400
    
    return jsonify({'message': 'new job created successfully'})
