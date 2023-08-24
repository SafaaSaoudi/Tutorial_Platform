from pymongo import MongoClient
import os
import googleapiclient.discovery
import re

API_KEY = 'AIzaSyA-O5kajgZFSBUBDh69_cqcRgq3KsSHXww'

youtube = googleapiclient.discovery.build('youtube', 'v3', developerKey=API_KEY)

def search_videos(query):
    request = youtube.search().list(
        q=query,
        type='video',
        part='id,snippet',
        maxResults=10  
    )
    response = request.execute()
    return response.get('items', [])

def clean_title(title):
    cleaned_title = re.sub(r'[^\w\s]', '', title)  # Suppression des caractères non alphanumériques
    cleaned_title = cleaned_title.strip()  # Suppression des espaces en début et fin de chaîne
    return cleaned_title

if __name__ == "__main__":
    search_queries = ["Java programming tutorial", "Python tutorial", "Kotlin tutorial"]
    
    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    video_collection = db['youtube_videos']
    
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
                
                video_data = {
                    'title': cleaned_title,
                    'video_link': video_link,
                }
                
                inserted_video = video_collection.insert_one(video_data)
                
                print("Video Title:", cleaned_title)
                print("Video Link:", video_link)
                print("Video inserted with ID:", inserted_video.inserted_id)
                print("-------")
            
            print(f"Data Cleaning completed for '{search_query}'.")
        else:
            print(f"No videos found for '{search_query}'.")
