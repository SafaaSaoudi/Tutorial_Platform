import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient


def scrape_html_tutorial(course_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3"
    }

    # Send a GET request to the URL with headers
    response = requests.get(course_url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        link_element = soup.find('a', class_='course_btn add-course-id course_btn--shop l-but')
        if link_element:
            print(link_element)
            link = link_element.get('data-href')
        else:
            print("Failed to find link element.")
            return None
        
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
                'link': link,
            
        }
        
        return course_data
    else:
        print("Failed to retrieve page.")
        return None


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
