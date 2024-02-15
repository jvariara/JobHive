import requests as rqst
from bs4 import BeautifulSoup as bs

def get_posted_jobs():
    page = rqst.get('https://github.com/SimplifyJobs/New-Grad-Positions')

    soup = bs(page.content, "html.parser")

    tbodys = soup.find_all('tbody')

    raw_body = tbodys[1]

    all_rows = []

    for y in raw_body.find_all('tr'):
        row = []
        for x in y.find_all('td'):
            row.append(x.text)
        final_dict = {
            'company' : row[0],
            'title' : row[1],
            'location' : row[2],
            'link' : row[3],
            'date posted': row[4]
        } if len(row[3]) > 0 else None
        all_rows.append(final_dict)

    print(all_rows)