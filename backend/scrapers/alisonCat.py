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
