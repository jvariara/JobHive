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
        for idx, x in enumerate(y.find_all('td')):
            if idx == 3 and x.find_all('a'):
                links = x.find_all('a')
                link = links[0].get('href')
                row.append(link)
            else:
                row.append(x.text)
        
        final_dict = {
            'company' : row[0],
            'title' : row[1],
            'location' : row[2],
            'link' : row[3],
            'date posted': row[4]
        } if len(row[3]) > 0 else None
        
        all_rows.append(final_dict)
                
    return all_rows
    
if __name__ == "__main__":
    get_posted_jobs()