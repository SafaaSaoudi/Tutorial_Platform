import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']

url_js = [
    'https://www.simplilearn.com/resources/cloud-computing/tutorials',
    'https://www.simplilearn.com/resources/devops/tutorials',
    'https://www.simplilearn.com/resources/agile-and-scrum/tutorials',
    'https://www.simplilearn.com/resources/big-data-and-analytics/tutorials',
    'https://www.simplilearn.com/resources/digital-marketing/tutorials',
    'https://www.simplilearn.com/what-is-dimensionality-reduction-article/tutorials',
    'https://www.simplilearn.com/resources/software-development/tutorials'
]

def parse(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')  # Parse the HTML content

    technology_items = soup.select('a.card')  # Use the select method for CSS selectors
    for item in technology_items:
        technology_name = item.select_one('h4').get_text()
        description = item.select_one('p').get_text()
        imageLink = item.select_one('img[data-src]')['data-src']
        technology_href = item['href']

        course_data = {
            'title': technology_name,
            'imageLink': imageLink,
            'description': description,
            'link': technology_href
        }
        
        result = all_courses.insert_one(course_data)

for url in url_js:
    
    parse(url)