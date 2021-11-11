from django.conf import settings
import requests
import time
import googlemaps


def nearbySearch(data, keyword):
    print("Hi I am in nearbysearch")

    location = data['location']
    if data['number_dates'] == 2:
        radius = 20000
    elif data['number_dates'] == 1:
        radius = 10000
    elif data['number_dates'] > 2:
        radius = 50000

    budget = data['preferences']['budget']

    if budget == -1:
        price = 1
    elif budget == 0:
        price = 3
    else:
        price = 4

    url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={location['lat']},{location['lng']}&radius={radius}&type=tourist_attraction&keyword={keyword}&key={settings.GOOGLE_API_KEY}"
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


def direction(parameters, results):
    number_dates = parameters['number_dates']
    destination_id = parameters['place_id']
    waypoints = []
    i = 0
    for key in results:
        print(i, key)
        if number_dates == 1 and i < 4:
            waypoints.append(results[key]['place_id'])
        elif number_dates == 2 and i < 8:
            waypoints.append(results[key]['place_id'])
        elif number_dates >= 3 and i < 14:
            waypoints.append(results[key]['place_id'])
        else:
            break
        i += 1


    string = ''
    for val in waypoints[:-1]:
        string += f"place_id:{val}|"

    string += f"place_id:{waypoints[-1]}"

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin=place_id:{destination_id}&destination=place_id:{destination_id}&waypoints={string}&optimize_waypoint=True&key={settings.GOOGLE_API_KEY}"
    payload = {}
    headers = {}


    response = requests.request("GET", url, headers=headers, data=payload)

    # print(response.json()['routes'][0]['legs'])
    directions_result = response.json()

    waypoint_order = directions_result['routes'][0]["waypoint_order"]
    new_order = waypoint_order[:]
    index = 0
    for o in waypoint_order:
        new_order[index] = waypoints[o]
        index += 1

    string2 = ''
    for val in new_order[:-1]:
        string2 += f"place_id:{val}|"

    string2 += f"place_id:{new_order[-1]}"

    url = f"https://maps.googleapis.com/maps/api/directions/json?origin=place_id:{destination_id}&destination=place_id:{destination_id}&waypoints={string2}&key={settings.GOOGLE_API_KEY}"

    response2 = requests.request("GET", url, headers=headers, data=payload)
    directions_result_final = response2.json()

    # with open("direction.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(directions_result_final))
    return directions_result_final


def placeDetails(id):
    url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={id}&key={settings.GOOGLE_API_KEY}"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response.json()['result']
