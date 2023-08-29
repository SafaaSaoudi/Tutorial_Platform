import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
params = db['params']
def scrape_html_tutorial(course_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    # Send a GET request to the URL with headers
    response = requests.get(course_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_element = soup.find('h1', class_='course-title')
        if title_element:
            title = title_element.text.strip()
        else:
            print("Failed to find title element.")
            return None
        
        description_element = soup.find('div', class_='course-headline l-info__headline')
        if description_element:
            description = description_element.text.strip()
        else:
            print("Failed to find description element.")
            return None
        
        course_data = {
                'title': title,
                'description': description,
                'link': course_url,
            
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
        return course_data
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
    python_tutorial_urls = [
        "https://alison.com/fr/cours/diplome-en-gestion-des-ventes",
        "https://alison.com/fr/cours/gestion-de-projet-les-notions-de-base",
        "https://alison.com/fr/cours/commerceded%C3%A9tail-actions-psychologie-et-s%C3%A9curit%C3%A9",
        "https://alison.com/fr/cours/principes-de-base-du-copyediting",
        "https://alison.com/fr/cours/diplome-en-etudes-de-langue-francaise"
    ]
    
    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    html_tutorials = db['all_courses']
    
    for url in python_tutorial_urls:
        course_data = scrape_html_tutorial(url)
        if course_data:
            inserted_course = html_tutorials.insert_one(course_data)
            print("Course data inserted with ID:", inserted_course.inserted_id)
    
    # Data Cleaning
    print("Starting Data Cleaning...")
    
    for course in html_tutorials.find({}):
        cleaned_course = clean_data(course)
        html_tutorials.update_one({"_id": course["_id"]}, {"$set": cleaned_course})
    
    print("Data Cleaning completed.")

    retrieved_courses = html_tutorials.find({})
    for course in retrieved_courses:
         print(course)
