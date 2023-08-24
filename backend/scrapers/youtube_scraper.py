from pymongo import MongoClient
import os
import googleapiclient.discovery


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

if __name__ == "__main__":
    search_queries = ["Java programming tutorial", "Python tutorial", "Kotlin tutorial"]
    
    
    client = MongoClient('mongodb+srv://eyasomai:0000@tutoapp.ipta4hq.mongodb.net/test')
    db = client['test']
    video_collection = db['youtube_videos']
    
    for search_query in search_queries:
        videos = search_videos(search_query)
        
        if videos:
            print(f"Videos for '{search_query}':")
            for video in videos:
                title = video['snippet']['title']
                video_id = video['id']['videoId']
                video_link = f"https://www.youtube.com/watch?v={video_id}"
                
                video_data = {
                    'title': title,
                    'video_link': video_link,
                }
                
                inserted_video = video_collection.insert_one(video_data)
                
                print("Video Title:", title)
                print("Video Link:", video_link)
                print("Video inserted with ID:", inserted_video.inserted_id)
                print("-------")
        else:
            print(f"No videos found for '{search_query}'.")
