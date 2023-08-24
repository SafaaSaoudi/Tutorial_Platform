import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

def scrape_html_tutorial(course_url):
    response = requests.get(course_url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title_element = soup.find('h1', class_='lp-landing-page-header__title')
        if title_element:
            title = title_element.text.strip()
        else:
            print("Failed to find title element.")
            return None
        
        description_element = soup.find('div', class_='le-course__header__description')
        if description_element:
            description = description_element.text.strip()
        else:
            print("Failed to find description element.")
            return None
        
        course_data = {
            'title': title,
            'description': description,
            'link': course_url
        }
        
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
        "https://www.sololearn.com/learn/courses/python-introduction",
        "https://www.sololearn.com/learn/courses/web-development",
        "https://www.sololearn.com/learn/courses/sql-introduction",
        "https://www.sololearn.com/learn/courses/javascript-introduction",
        "https://www.sololearn.com/learn/courses/c-plus-plus-introduction"
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
        print("Course Title:", course['title'])
        print("Description:", course['description'])
        print("Link:", course['link'])
        print("-------")
