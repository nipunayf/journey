from django.conf import settings
import requests
import time
import googlemaps

gmaps = googlemaps.Client(key=settings.GOOGLE_API_KEY)


def nearbySearch(data, keyword):
    location = data.location
    if data.number_dates == 2:
        radius = 20000
    elif data.number_dates == 1:
        radius = 10000
    elif data.number_dates > 2:
        radius = 50000

    budget = data.budget

    if budget == -1:
        price = 1
    elif budget == 0:
        price = 3
    else:
        price = 4

    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location.lat},{location.lng}&radius={radius}&type=tourist_attraction&keyword={keyword}&key={settings.GOOGLE_API_KEY}"

    payload = {}
    headers = {}
    try:
        response = requests.request("GET", url, headers=headers, data=payload)
        if response.status_code == '200':
            print(response.json()['results'])
            nearbySearchResult = response.json()['results']
            return nearbySearchResult
        else:
            return []
    except:
        print("error occurred while text searching")
        return 'No text search result'


def direction(parameters, results):
    number_dates = parameters['number_dates']
    destination_id = parameters['place_id']
    waypoints = []
    i = 0
    for key in results:
        if number_dates == 1 & i < 4:
            waypoints.append(results[key]['place_id'])
        elif number_dates == 2 & i < 8:
            waypoints.append(results[key]['place_id'])
        elif number_dates >= 3 & i < 14:
            waypoints.append(results[key]['place_id'])
        else:
            break
        i += 1
        
    print(waypoints)
    string = ''
    for val in waypoints[:-1]:
        string += f"place_id:{val}|"

    string += f"place_id:{waypoints[-1]}"

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin=place_id:{destination_id}&destination=place_id:{destination_id}&waypoints={string}&optimize_waypoint=True&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0"
    payload = {}
    headers = {}

    print(url)
    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.json()['routes'][0]['legs'])
    directions_result = response.json()

    waypoint_order = directions_result['routes'][0]["waypoint_order"]
    new_order = waypoint_order
    index = 0
    for o in waypoint_order:
        new_order[index] = waypoints[o]
        index += 1

    string2 = ''
    for val in new_order[:-1]:
        string2 += f"place_id:{val}|"

    string2 += f"place_id:{new_order[-1]}"

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin=place_id:{destination_id}&destination=place_id:{destination_id}&waypoints={string2}&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0"
    print(url)
    response2 = requests.request("GET", url, headers=headers, data=payload)
    directions_result_final = response2.json()
    print(directions_result_final)

    return directions_result_final
