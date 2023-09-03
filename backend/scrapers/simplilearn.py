import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import re

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']
params = db['params']

url_js = [
    'https://www.simplilearn.com/resources/cloud-computing/tutorials',
    'https://www.simplilearn.com/resources/devops/tutorials',
    'https://www.simplilearn.com/resources/agile-and-scrum/tutorials',
    'https://www.simplilearn.com/resources/big-data-and-analytics/tutorials',
    'https://www.simplilearn.com/resources/digital-marketing/tutorials',
    'https://www.simplilearn.com/what-is-dimensionality-reduction-article/tutorials',
    'https://www.simplilearn.com/resources/software-development/tutorials'
]

def clean_data(course):
    # Mettre en place des valeurs par défaut
    if 'title' not in course:
        course['title'] = 'Unknown Title'
    if 'description' not in course:
        course['description'] = 'No Description Available'
    if 'imageLink' not in course:
        course['imageLink'] = 'No Image Available'
    if 'link' not in course:
        course['link'] = 'No Link Available'
    
    # Nettoyage des caractères indésirables
    course['title'] = ''.join(e for e in course['title'] if e.isalnum() or e.isspace())
    course['description'] = ''.join(e for e in course['description'] if e.isalnum() or e.isspace())
    course['imageLink'] = course['imageLink'].strip()  # Suppression des espaces en début et fin de chaîne
    course['link'] = course['link'].strip()  # Suppression des espaces en début et fin de chaîne
    
    # Suppression des doublons
    unique_words = set()
    course['title'] = ' '.join(word for word in course['title'].split() if word not in unique_words and not unique_words.add(word))
    
    # Formatage des données
    course['title'] = course['title'].upper()
    
    # Nettoyage de la description de tout ce qui n'est pas alphanumérique
    course['description'] = re.sub(r'[^\w\s]', '', course['description'])
    
    return course

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
                course_data['type'] = 'Text & videos'
            else:
                course_data[name] = 'unknown'       
 
        cleaned_course = clean_data(course_data)
        result = all_courses.insert_one(cleaned_course)
        
        print("Insertion result:", course_data)

print("Starting Web Scraping...")

for url in url_js:
    parse(url)

print("Web Scraping completed.")
