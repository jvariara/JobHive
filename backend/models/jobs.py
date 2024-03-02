from .user import db
from datetime import datetime


class Jobs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(), nullable=False)
    title = db.Column(db.String(), nullable=False)
    location = db.Column(db.String(), nullable=False)
    role = db.Column(db.String())
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    url = db.Column(db.String, nullable=False)
    date_posted = db.Column(db.String(), nullable=False)
    
    def __init__(self, company, title, location, role, url, date_posted):
        self.company = company
        self.title = title
        self.location = location
        self.role = role
        self.url = url
        self.date_posted = date_posted
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'company' : self.company,
            'location' : self.location,
            'role' : self.role,
            'url' : self.url,
            'created_at' : self.created_at.isoformat(),
            'date_posted': self.date_posted
        }
    
    @staticmethod
    def get_jobs(role):
        return [job.to_dict() for job in Jobs.query.filter_by(role=role).all()] if role else [job.to_dict() for job in Jobs.query.all()]
        