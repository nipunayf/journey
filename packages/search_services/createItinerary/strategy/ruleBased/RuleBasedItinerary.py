import math
from sklearn import preprocessing
import numpy as np
import itertools
import datetime
import json
from ...helper import enums, MapApis


# Helper functions
def nearbySearchResult(person_keyword, parameters):
    results = {}

    for keyword in person_keyword:
        r = MapApis.nearbySearch(parameters, keyword)
        for i in r:
            if i['place_id'] in results:
                pass
            else:
                results[i['place_id']] = i

    # with open("nearby_search_result.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(results))
    return results


def createPersonKeyword(dic):
    person_type = []
    person_keyword = []

    for key in dic:
        NOT_KEY = f'NOT_{key}'
        type_key = enums.Types[key].value
        type_not_key = enums.Types[NOT_KEY].value
        keyword_key = enums.Keywords[key].value
        keyword_not_key = enums.Keywords[NOT_KEY].value
        if dic[key] <= -1:  # nature,relax,entertainment
            person_type += type_key
            person_keyword += keyword_key
        elif dic[key] >= 1:  # indoor,adventure,traditional
            person_type += type_not_key
            person_keyword += keyword_not_key
        elif dic[key] == 0:
            person_type += type_key[:2] + type_not_key[:2]
            person_keyword += keyword_key[:2] + keyword_not_key[:2]

    person_type = set(person_type)
    person_keyword = set(person_keyword)
    # with open("person_keyword.txt", 'w', encoding='utf-8') as f:
    #     f.write(str(person_keyword))

    return person_keyword


def initialPlaces(parameters):
    # destination_id = parameters.destination_id
    # destination_name = parameters.name
    # number_dates = parameters.number_dates
    # dates = parameters.dates
    preferences = parameters['preferences']

    # popularity = preferences.popularity
    # budget = preferences.budget

    introversion = preferences['introversion']
    knowledge = preferences['knowledge']
    energy = preferences['energy']

    dic = {'INTROVERSION': introversion, 'KNOWLEDGE': knowledge, 'ENERGY': energy}

    person_keyword = createPersonKeyword(dic)

    results = nearbySearchResult(person_keyword, parameters)

    # return places according to the preferences(keywords)
    # print("result printing")
    # print(results)
    # with open("nearby_results.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(results))
    return results


def filterPlacesbyType(results):
    results_copy = dict(results)
    NEGLECT = enums.Types.NEGLECT.value
    for key in results:
        for types in results[key]["types"]:
            if types in NEGLECT:
                if key in results_copy:
                    del results_copy[key]

    # with open("filter_type_results.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(results_copy))
    return results_copy


# def filterPlacesbyRating(results):
#     results_copy = dict(results)
#     for key in results_copy:
#         rate = results_copy[key]["rating"]
#         n_rate = results_copy[key]["user_ratings_total"]
#         if rate < 3:
#             del results_copy[key]
#
#     return results_copy

def getDistance(lat1, lon1, lat2, lon2):
    input = (lat1, lon1, lat2, lon2)

    # with open("getdistance_input.txt", 'w', encoding='utf-8') as f:
    #     f.write(str(input))

    def deg2rad(deg):
        return deg * (math.pi / 180)

    R = 6371
    dLat = deg2rad(lat2 - lat1)
    dLon = deg2rad(lon2 - lon1)

    a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.sin(
        dLon / 2) * math.sin(dLon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = R * c
    # with open("getdistance.txt", 'w', encoding='utf-8') as f:
    #     f.write(str(d))
    return d


def sortbyDistance(parameters, results):
    results_copy = dict(results)

    lat = parameters['location']['lat']
    lng = parameters['location']['lng']

    for key in results_copy:
        distance = getDistance(lat, lng, results_copy[key]['geometry']['location']['lat'],
                               results_copy[key]['geometry']['location']['lng'])
        results_copy[key]['distance_from_origin'] = distance

    # results_copy = sorted(results_copy.items(), key=lambda x: x[1]['distance_from_origin'])
    # with open("sorted_distance.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(results_copy))
    return results_copy


def ranking(results):
    # using sorted by distance dictionary
    results_copy = dict(results)
    distance_list = []
    rating_list = []
    total_rating_list = []

    for key in results_copy:
        distance_list.append(results_copy[key]['distance_from_origin'])
        rating_list.append(results_copy[key]['rating'])
        total_rating_list.append(results_copy[key]["user_ratings_total"])

    distance_norm = preprocessing.normalize([distance_list], norm='max')
    rating_norm = preprocessing.normalize([rating_list], norm='max')
    total_rating_norm = preprocessing.normalize([total_rating_list], norm='max')

    ranking = rating_list[:]
    i = 0
    for key in results_copy:
        ranking[i] = (1 - distance_norm[0][i]) * 0.5 + rating_norm[0][i] * 0.3 + total_rating_norm[0][i] * 0.2
        results_copy[key]['rank'] = ranking[i]
        i += 1

    results_copy = dict(sorted(results_copy.items(), key=lambda x: x[1]['rank'], reverse=True))

    # with open("ranking.json", 'w', encoding='utf-8') as f:
    #     f.write(json.dumps(results_copy))
    return results_copy


def itinerary(parameters, results):
    leg_day1, leg_day2, leg_day3, leg_day4 = 0, 0, 0, 0
    number_dates = parameters['number_dates']
    dates = parameters['Dates']
    results_copy = dict(results)
    direction_results = MapApis.direction(parameters, results_copy)
    legs = direction_results['routes'][0]['legs']
    geocode_waypoints = direction_results['geocoded_waypoints']
    place_ids = []
    routes = {}
    for day in dates:
        routes[day] = {}

    for code in geocode_waypoints:
        place_ids.append(code['place_id'])

    times = ['arrival', 'departure']
    if number_dates == 1:
        routes[dates[0]] = []
        for id in range(5):
            routes[dates[0]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list1 = place_ids[:5]
        leg_day1 = legs[:5]

    if number_dates == 2:
        routes[dates[0]] = []
        for id in range(4):
            routes[dates[0]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list1 = place_ids[:4]
        leg_day1 = legs[:4]

        routes[dates[1]] = []
        for id in range(4, 8):
            routes[dates[1]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list2 = place_ids[4:8]
        leg_day2 = legs[4:8]

    if number_dates == 3:
        routes[dates[0]] = []
        for id in range(4):
            routes[dates[0]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]

        routes[dates[1]] = []
        for id in range(4, 8):
            routes[dates[1]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]

        routes[dates[2]] = []
        for id in range(8, 11):
            routes[dates[2]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]

    if number_dates >= 4:
        routes[dates[0]] = []
        for id in range(4):
            routes[dates[0]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]

        routes[dates[1]] = []
        for id in range(4, 8):
            routes[dates[1]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]

        routes[dates[2]] = []
        for id in range(8, 11):
            routes[dates[2]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]

        routes[dates[3]] = []
        for id in range(11):
            routes[dates[3]].append({'placeID': place_ids[id],
                                     'arrival': None,
                                     'departure': None
                                     })
        id_list4 = place_ids[11:]
        leg_day4 = legs[11:]

    if leg_day1 != 0:
        arrival = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure = datetime.timedelta(hours=8, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day1)):
            if val == 0:
                routes[dates[0]][val]['arrival'] = str(arrival)
                routes[dates[0]][val]['departure'] = str(departure)

            elif val == 3:
                travel_time = datetime.timedelta(seconds=leg_day1[val - 1]['duration']['value'])
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival = departure + travel_time + lunch_time
                # print(arrival)
                routes[dates[0]][val]['arrival'] = str(arrival)

                departure = arrival + spend_time
                # print(departure)
                routes[dates[0]][val]['departure'] = str(departure)
            else:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                # print(travel_time)

                arrival = departure + travel_time
                # print(arrival)
                routes[dates[0]][val]['arrival'] = str(arrival)

                departure = arrival + spend_time
                # print(departure)
                routes[dates[0]][val]['departure'] = str(departure)

    if leg_day2 != 0:
        arrival = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day2)):
            if val == 0:
                routes[dates[1]][val]['arrival'] = str(arrival)
                routes[dates[1]][val]['departure'] = str(departure)
            elif val == 2:
                second = leg_day2[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival = departure + travel_time + lunch_time
                # print(arrival)
                routes[dates[1]][val]['arrival'] = str(arrival)

                departure = arrival + spend_time
                # print(departure)
                routes[dates[1]][val]['departure'] = str(departure)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day2[val - 1]['duration']['value'])
                routes[dates[1]][val]['arrival'] = str(departure + travel_time)
                arrival = departure + travel_time
                routes[dates[1]][val]['departure'] = str(arrival + spend_time)
                departure = arrival + spend_time

    if leg_day3 != 0:
        arrival = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day3)):
            if val == 0:
                routes[dates[2]][val]['arrival'] = str(arrival)
                routes[dates[2]][val]['departure'] = str(departure)
            elif val == 2:
                second = leg_day3[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival = departure + travel_time + lunch_time
                # print(arrival)
                routes[dates[2]][val]['arrival'] = str(arrival)

                departure = arrival + spend_time
                # print(departure)
                routes[dates[2]][val]['departure'] = str(departure)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day3[val - 1]['duration']['value'])
                routes[dates[2]][val]['arrival'] = str(departure + travel_time)
                arrival = departure + travel_time
                routes[dates[2]][val]['departure'] = str(arrival + spend_time)
                departure = arrival + spend_time

    if leg_day4 != 0:
        arrival = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day4)):
            if val == 0:
                routes[dates[3]][val]['arrival'] = str(arrival)
                routes[dates[3]][val]['departure'] = str(departure)
            elif val == 2:
                second = leg_day4[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival = departure + travel_time + lunch_time
                # print(arrival)
                routes[dates[3]][val]['arrival'] = str(arrival)

                departure = arrival + spend_time
                # print(departure)
                routes[dates[3]][val]['departure'] = str(departure)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day4[val - 1]['duration']['value'])
                routes[dates[3]][val]['arrival'] = str(departure + travel_time)
                arrival = departure + travel_time
                routes[dates[3]][val]['departure'] = str(arrival + spend_time)
                departure = arrival + spend_time

    # print('ROUTE', routes)
    # print(results_copy)
    for day in routes:
        if day == dates[0]:
            for id in range(1, len(routes[day])):
                r = results_copy[routes[day][id]['placeID']]
                routes[day][id]['geometry'] = r['geometry']
                routes[day][id]['name'] = r['name']
                routes[day][id]['image'] = r['photos'][0]["photo_reference"]
                routes[day][id]['rating'] = r['rating']
        else:
            for id in range(len(routes[day])):
                r = results_copy[routes[day][id]['placeID']]
                routes[day][id]['geometry'] = r['geometry']
                routes[day][id]['name'] = r['name']
                routes[day][id]['image'] = r['photos'][0]["photo_reference"]
                routes[day][id]['rating'] = r['rating']

    # print(routes)
    del routes[dates[0]][0]
    return routes
