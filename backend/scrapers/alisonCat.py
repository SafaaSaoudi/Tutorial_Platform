import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def scrape_categories(course_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    response = requests.get(course_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        categories = []

        for item in soup.find_all('li'):
            link_element = item.find('a')
            if link_element:
                link = link_element.get('href')
                name = link_element.get('title')  # Use get() method with default value
                categories.append({'name': name, 'link': link})

        return categories
    else:
        print("Failed to retrieve page.")
        return None

if __name__ == "__main__":
    alison_url = "https://alison.com/fr"

    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    html_tutorials = db['all_courses']

    categories_data = scrape_categories(alison_url)
    if categories_data:
        html_tutorials.insert_many(categories_data)
        print("Categories added to MongoDB.")
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def scrape_categories(course_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    response = requests.get(course_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        categories = []

        categories_div = soup.find('div', class_='categories')
        for item in categories_div.find_all('li'):
            link_element = item.find('a')
            if link_element:
                link = link_element.get('href')
                name = link_element.get('title')  # Use get() method with default value
                categories.append({'name': name, 'link': link})

        return categories
    else:
        print("Failed to retrieve page.")
        return None
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

if __name__ == "__main__":
    alison_url = "https://alison.com/fr"

    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    html_tutorials = db['all_courses']

    categories_data = scrape_categories(alison_url)
    if categories_data:
        html_tutorials.insert_many(categories_data)
        print("Categories added to MongoDB.")
    print("Starting Data Cleaning...")
    
    for course in html_tutorials.find({}):
        cleaned_course = clean_data(course)
        html_tutorials.update_one({"_id": course["_id"]}, {"$set": cleaned_course})
    
    print("Data Cleaning completed.")

    retrieved_courses = html_tutorials.find({})
    for course in retrieved_courses:
        print("Course category:", course['title'])
        print("Description:", course['description'])
        print("Link:", course['link'])
        print("-------")