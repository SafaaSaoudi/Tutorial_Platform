import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import re

client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
db = client['test']
all_courses = db['all_courses']
params = db['params']

url_js = 'https://www.theodinproject.com/paths/full-stack-javascript'
url_ruby = 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails'

def clean_data(course):
    
    
    # Mettre en place des valeurs par défaut
    if 'title' not in course:
        course['title'] = 'Unknown Title'
    if 'description' not in course:
        course['description'] = 'No Description Available'
    if 'link' not in course:
        course['link'] = 'No Link Available'
    
    # Nettoyage des caractères indésirables
    course['title'] = ''.join(e for e in course['title'] if e.isalnum() or e.isspace())
    course['description'] = ''.join(e for e in course['description'] if e.isalnum() or e.isspace())
    
    # Suppression des doublons
    unique_words = set()
    course['title'] = ' '.join(word for word in course['title'].split() if word not in unique_words and not unique_words.add(word))
    course['description'] = ' '.join(word for word in course['description'].split() if word not in unique_words and not unique_words.add(word))
    
    # Formatage des données
    course['title'] = course['title'].upper()
    
    
    
    return course

def odin_scraper(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    div_elements = soup.find_all('div', class_='bg-white shadow rounded-lg dark:bg-gray-800 dark:ring-1 dark:ring-white/10 dark:ring-inset mb-16 relative')
    for div in div_elements:
        title_element = div.find('h2', class_='font-medium text-xl md:text-left text-gray-900 dark:text-gray-200')
        title = title_element.text.strip() if title_element else '' 
        url_element = div.find('a', class_='button button--secondary')
        link = url_element['href'] if url_element else ''
        description_element = div.find('p', class_='prose prose-gray dark:prose-invert max-w-none')
        description = description_element.text.strip() if description_element else ''
        
    
        
        course_data = {
            'title': title,
            'link': link,
            'description': description,
        }
        
        for param in params.find():
            name = param['name']
            if name == 'date':
                course_data['date'] = 'Not available'
            elif name == 'level':
                course_data['level'] = "Hard"
            elif name == 'price':
                course_data['price'] = 'Free'
            elif name == 'category':
                course_data['category'] = 'IT'
            elif name == 'type':
                course_data['type'] = 'Text'
            else:
                course_data[name] = 'unknown'

        
        cleaned_course = clean_data(course_data)
        
        result = all_courses.insert_one(cleaned_course)
        
       

odin_scraper(url_js)
odin_scraper(url_ruby)
