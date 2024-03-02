from models.jobs import Jobs
from models.user import Users
from scripts.scrape import get_posted_jobs

users = [
    {
    "username" : "user1",
    "email" : "user1@gmail.com",
    "display_name" : "user1",
    "password" : "User!123",    
    },
    {
    "username" : "user2",
    "email" : "user2@gmail.com",
    "display_name" : "user2",
    "password" : "User!223",    
    },
    {
    "username" : "user3",
    "email" : "user3@gmail.com",
    "display_name" : "user3",
    "password" : "User!323",    
    },
    {
    "username" : "user4",
    "email" : "user4@gmail.com",
    "display_name" : "user4",
    "password" : "User!423",    
    },
]

def create_job():
    example2 = Jobs("google", \
        "Software Engineer", \
        "San Franciso, CA", \
        "fulltime", \
        "http://google.com")
    example = Jobs("google", \
        "Software Engineer", \
        "San Franciso, CA", \
        "internship", \
        "http://google.com")
    example.save()
    example2.save()
    return

def create_users():
    for user in users:
        new_user = Users(user['username'],
                         user['email'],
                         user['password'])
        new_user.save()
    return

def scrape_jobs_simplify():
    posted_jobs = get_posted_jobs()
    for job in posted_jobs:
        new_job = Jobs(job['company'],
                       job['title'],
                       job['location'],
                       "fulltime",
                       job['link'],
                       job['date posted'])
        new_job.save()
    return