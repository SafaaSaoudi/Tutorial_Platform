import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']

url_js = [
   'https://www.theodinproject.com/paths/foundations/courses/foundations'
]

def parse(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')  

    technology_items = soup.select('a.grow')  
    for item in technology_items:
        technology_name = item.select_one('p').get_text()
      
        technology_href = item['href']
        print(technology_name)
        print(technology_href)
        course_data = {
            'title': technology_name,
            
            'link': technology_href
        }
        
        result = all_courses.insert_one(course_data)

for url in url_js:
    
    parse(url)