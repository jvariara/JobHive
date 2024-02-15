from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from .user import db


class Jobs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(40), nullable=False)
    title = db.Column(db.String(40), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    job_type = db.Column(db.String(30))
    url = db.Column(db.String, nullable=False)
    
    def __init__(self, company, title, location, job_type, url):
        self.company = company
        self.title = title
        self.location = location
        self.job_type = job_type
        self.url = url
    
    @staticmethod
    def get_internships():
        
        pass
    
    @staticmethod
    def get_fulltime():
        pass
    
    @staticmethod
    def get_all():
        pass