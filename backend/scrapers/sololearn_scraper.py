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
        }
        
        return course_data
    else:
        print("Failed to retrieve page.")
        return None

def clean_data(course_data):
    # Nettoyer la description en enlevant les sauts de ligne, tabulations, etc.
    if 'description' in course_data:
        cleaned_description = course_data['description'].replace('\n', ' ').replace('\t', ' ').strip()
        course_data['description'] = cleaned_description

    # Autres étapes de nettoyage selon les besoins...

    return course_data

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
    html_tutorials = db['sololearn_courses']
    
    for url in python_tutorial_urls:
        course_data = scrape_html_tutorial(url)
        if course_data:
            cleaned_course_data = clean_data(course_data)
            inserted_course = html_tutorials.insert_one(cleaned_course_data)
            print("Course data inserted with ID:", inserted_course.inserted_id)
    
    retrieved_courses = html_tutorials.find({})
    for course in retrieved_courses:
        print("Course Title:", course['title'])
        print("Description:", course['description'])
        print("-------")
