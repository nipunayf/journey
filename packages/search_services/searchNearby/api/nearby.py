from django.conf import settings
import requests
import time
import googlemaps
import json


def nearbySearch(parameters):
    location = parameters['location']
    radius = 6000
    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location['lat']},{location['lng']}&radius={radius}&type=tourist_attraction&key={settings.GOOGLE_API_KEY}"
    print(url)
    payload = {}
    headers = {}
    try:
        response = requests.request("GET", url, headers=headers, data=payload)

        print(response.json()['results'])
        nearbySearchResult = response.json()['results']
        return nearbySearchResult

    except:
        print("error occurred while nearby searching")
        return 'No text search result'
