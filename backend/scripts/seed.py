from models.jobs import Jobs

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