from pymongo import MongoClient
import os
import googleapiclient.discovery
import re
from datetime import datetime, timedelta

API_KEY = 'AIzaSyA-O5kajgZFSBUBDh69_cqcRgq3KsSHXww'

youtube = googleapiclient.discovery.build('youtube', 'v3', developerKey=API_KEY)

def search_videos(query):
    request = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',  # Supprimer 'contentDetails' de la liste des parties
        maxResults=10  
    )
    response = request.execute()
    return response.get('items', [])

def get_video_details(video_id):
    request = youtube.videos().list(
        part='contentDetails,snippet',  # Récupérer les détails du contenu de la vidéo et les informations de base
        id=video_id
    )
    response = request.execute()
    return response.get('items', [])[0]

def get_duration(duration_str):
    duration = timedelta()  # Durée par défaut
    match = re.search(r'(\d+)H', duration_str)
    if match:
        hours = int(match.group(1))
        duration += timedelta(hours=hours)
    
    match = re.search(r'(\d+)M', duration_str)
    if match:
        minutes = int(match.group(1))
        duration += timedelta(minutes=minutes)
    
    match = re.search(r'(\d+)S', duration_str)
    if match:
        seconds = int(match.group(1))
        duration += timedelta(seconds=seconds)
    
    return duration

def clean_title(title):
    cleaned_title = re.sub(r'[^\w\s]', '', title)  # Suppression des caractères non alphanumériques
    cleaned_title = cleaned_title.strip()  # Suppression des espaces en début et fin de chaîne
    return cleaned_title

if __name__ == "__main__":
    search_queries = ["Java programming tutorial", "Python tutorial", "Kotlin tutorial"]
    
    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    video_collection = db['all_courses']
    params = db['params']
    for search_query in search_queries:
        print(f"Starting Data Cleaning for '{search_query}'...")
        videos = search_videos(search_query)
        
        if videos:
            print(f"Videos for '{search_query}':")
            for video in videos:
                title = video['snippet']['title']
                video_id = video['id']['videoId']
                video_link = f"https://www.youtube.com/watch?v={video_id}"
                
                cleaned_title = clean_title(title)
                
                video_details = get_video_details(video_id)
                duration_str = video_details['contentDetails']['duration']
                upload_date = video_details['snippet']['publishedAt']
                upload_date = upload_date.split('T')[0]  # Enlève la partie T et tout ce qui suit
                
                duration = get_duration(duration_str)
                formatted_duration = str(duration)
                
                video_data = {
                    'title': cleaned_title,
                    'video_link': video_link,
                    'duration': formatted_duration,
                    'upload_date': upload_date,
                }
                for param in params.find():
                    name = param['name']
                    if name == 'date':
                        video_data['date'] = 'Not available'
                    elif name == 'level':
                        video_data['level'] = "Mixed"
                    elif name == 'price':
                        video_data['price'] = 'Free'
                    elif name == 'category':
                        video_data['category'] = 'IT'
                    elif name == 'type':
                        video_data['type'] = 'Video'
                    else:
                        video_data[name] = 'unknown'

                inserted_video = video_collection.insert_one(video_data)
                
                print("Video Title:", cleaned_title)
                print("Video Link:", video_link)
                print("Duration:", formatted_duration)
                print("Upload Date:", upload_date)
                print("Video inserted with ID:", inserted_video.inserted_id)
                print("-------")
            
            print(f"Data Cleaning completed for '{search_query}'.")
        else:
            print(f"No videos found for '{search_query}'.")
