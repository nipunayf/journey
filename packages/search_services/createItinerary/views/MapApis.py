import requests
import time


def textSearch(data):

    preferences = data.preferences
    location = data.location
    if data.number_dates > 1:
        radius = 20000
    else:
        radius = 10000
    url = f"https://maps.googleapis.com/maps/api/place/textsearch/json?query={preferences}&location={location.lat},{location.lng}&radius={radius}&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0"

    payload = {}
    headers = {}
    try:
        response = requests.request("GET", url, headers=headers, data=payload)
        print(response.text)
        textSearchResult = response.text
        return textSearchResult
    except:
        print("error occured while text searching")
        return 'No text search result'



