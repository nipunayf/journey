from django.conf import settings
import requests
import time
import googlemaps
import json


def placeDetails(id):
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={id}&key={settings.GOOGLE_API_KEY}"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json()['result']


def nearbySearch(parameters):
    location = parameters['location']
    radius = 15000
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
