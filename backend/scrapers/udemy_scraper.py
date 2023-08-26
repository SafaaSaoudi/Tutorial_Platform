import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']

url = "https://www.udemy.com/courses/"
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')
category_cards = soup.find_all('a', class_='top-categories--category-card--15wjg')

def clean_data(course):
    # Mettre en place des valeurs par défaut
    if 'title' not in course:
        course['title'] = 'Unknown Title'
    if 'link' not in course:
        course['link'] = 'No Link Available'
    
    # Nettoyage des caractères indésirables
    course['title'] = ''.join(e for e in course['title'] if e.isalnum() or e.isspace())
    
    # Suppression des doublons
    unique_words = set()
    course['title'] = ' '.join(word for word in course['title'].split() if word not in unique_words and not unique_words.add(word))
    
    # Formatage des données
    course['title'] = course['title'].upper()
    
    return course

print("Starting Web Scraping...")

for card in category_cards:
    try:
        title = card.find('span', class_='ud-heading-md').text
        link = card['href']
        
        course_data = {
            'title': title,
            'link': 'https://www.udemy.com' + link,
        }
        
        cleaned_course = clean_data(course_data)
        
        result = all_courses.insert_one(cleaned_course)
        
        print(f"Added Course: {cleaned_course['title']}\nLink: {cleaned_course['link']}\n")
        print("Insertion result:", result)
    except Exception as e:
        print("Error:", e)

print("Web Scraping completed.")

