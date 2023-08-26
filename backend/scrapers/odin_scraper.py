import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test")
db = client['test']
all_courses = db['all_courses']

url_js = 'https://www.theodinproject.com/paths/full-stack-javascript'
url_ruby = 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails'

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
        print("Title:", title)
        print("URL:", link)
        print("Description:", description)
        print("-" * 50)
        course_data = {
            'title': title,
            'link': link,
            'description': description,
        }
        result = all_courses.insert_one(course_data)
        print(f"Added Course: {title}\nLink: {link}\nDescription: {description}\n")
        print("Insertion result:", result)

odin_scraper(url_js)
odin_scraper(url_ruby)
