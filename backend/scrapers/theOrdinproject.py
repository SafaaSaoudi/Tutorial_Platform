import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']
params = db['params']

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

        course_data = {
            'title': technology_name,
            
            'link': technology_href
        }
        for param in params.find():
            name = param['name']
            if name == 'date':
                course_data['date'] = 'Not available'
            elif name == 'level':
                course_data['level'] = "Beginner"
            elif name == 'price':
                course_data['price'] = 'Free'
            elif name == 'category':
                course_data['category'] = 'Beginner'
            elif name == 'type':
                course_data['type'] = 'Text'
            else:
                course_data[name] = 'unknown'       
             
        result = all_courses.insert_one(course_data)
        print(course_data)
        
for url in url_js:
    
    parse(url)