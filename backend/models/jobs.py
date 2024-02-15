from .user import db
from datetime import datetime


class Jobs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(40), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(30))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    url = db.Column(db.String, nullable=False)
    
    def __init__(self, company, title, location, role, url):
        self.company = company
        self.title = title
        self.location = location
        self.role = role
        self.url = url
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    
    def to_dict(self):
        return {
            'id': self.id,
            'company' : self.company,
            'location' : self.location,
            'role' : self.role,
            'url' : self.url,
            'created_at' : self.created_at.isoformat()
        }
    
    @staticmethod
    def get_jobs(role):
        return [job.to_dict() for job in Jobs.query.filter_by(role=role).all()] if role else [job.to_dict() for job in Jobs.query.all()]
        