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

for card in category_cards:
    try:
        title = card.find('span', class_='ud-heading-md').text
        link = card['href']
        course_data = {
            'title': title,
            'link': 'https://www.udemy.com' + link,
        }
        result = all_courses.insert_one(course_data)
        print(f"Added Course: {title}\nLink: {link}\n")
        print("Insertion result:", result)
    except Exception as e:
        print("Error:", e)
