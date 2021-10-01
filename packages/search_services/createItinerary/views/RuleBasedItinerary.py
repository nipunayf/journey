from . import MapApis
import math
from sklearn import preprocessing
import numpy as np
import itertools
import datetime


def initialPlaces(parameters):
    itinerary = None
    # destination_id = parameters.destination_id
    # destination_name = parameters.name
    # number_dates = parameters.number_dates
    # dates = parameters.dates
    preferences = parameters.preferences

    # popularity = preferences.popularity
    # budget = preferences.budget

    nature = preferences.nature
    entertainment = preferences.entertainment
    relax = preferences.relax

    dic = {'NATURE': nature, 'ENTERTAINMENT': entertainment, 'RELAX': relax}

    person_type = []
    person_keyword = []

    for key in dic:
        type_key = f"enums.Types.{key}"
        type_not_key = f"enums.Types.NOT_{key}"
        keyword_key = f"enums.Keywords.{key}"
        keyword_not_key = f"enums.Keywords.NOT_{key}"
        if dic[key] == -1:
            person_type += type_key
            person_keyword += keyword_key
        elif dic[key] == 1:
            person_type += type_not_key
            person_keyword += keyword_not_key
        elif dic[key] == 0:
            person_type += type_key[:2] + type_not_key[:2]
            person_keyword += keyword_key[:2] + keyword_not_key[:2]

    person_type = set(person_type)
    person_keyword = set(person_keyword)

    results = {}

    for keyword in person_keyword:
        r = MapApis.textSearch(parameters, keyword)
        for i in r:
            if i['name'] in results:
                pass
            else:
                results[i['name']] = i

    # return places according to the preferences(keywords)
    return results


def filterPlacesbyType(results):
    results_copy = dict(results)
    NEGLECT = enums.Types.NEGLECT
    for key in results_copy:
        for types in results_copy[key]["types"]:
            if types in NEGLECT:
                del results_copy[key]
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


def sortbyDistance(parameters, results):
    results_copy = dict(results)

    def getDistance(lat1, lon1, lat2, lon2):
        def deg2rad(deg):
            return deg * (math.pi / 180)

        R = 6371
        dLat = deg2rad(lat2 - lat1)
        dLon = deg2rad(lon2 - lon1)

        a = math.sin(dLat / 2) * math.sin(dLat / 2) + math.cos(deg2rad(lat1)) * math.cos(deg2rad(lat2)) * math.sin(
            dLon / 2) * math.sin(dLon / 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        d = R * c
        print(d)
        return d

    lat = parameters["geometry"]['location']['lat']
    lng = parameters["geometry"]['location']['lng']

    for key in results_copy:
        distance = getDistance(lat, lng, results_copy[key]["geometry"]['location']['lat'],
                               results_copy[key]["geometry"]['location']['lng'])
        results_copy[key]['distance_from_origin'] = distance

    # results_copy = sorted(results_copy.items(), key=lambda x: x[1]['distance_from_origin'])

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

    ranking = []
    i = 0
    for key in results_copy:
        ranking[i] = (1 - distance_norm[0][i]) * 0.5 + rating_norm[0][i] * 0.3 + total_rating_norm[0][i] * 0.2
        results_copy[key]['rank'] = ranking[i]
        i += 1

    results_copy = dict(sorted(results_copy.items(), key=lambda x: x[1]['rank']))

    return results_copy


def itinerary(parameters, results):
    number_dates = parameters['number_dates']
    results_copy = dict(results)
    direction_results = MapApis.direction(parameters, results_copy)
    legs = direction_results['routes'][0]['legs']
    geocode_waypoints = direction_results['geocoded_waypoints']
    place_ids = []
    routes = {}
    for day in range(1, number_dates + 1):
        routes[f"day_{day}"] = {}

    for code in geocode_waypoints:
        place_ids.append(code['place_id'])

    if number_dates == 1:
        id_dic1 = dict.fromkeys(place_ids[:5], {})
        id_list1 = place_ids[:5]
        routes[day_1] = id_dic1
        leg_day1 = legs[:5]
    if number_dates == 2:
        id_dic1 = dict.fromkeys(place_ids[:4], {})
        routes[day_1] = id_dic1
        id_list1 = place_ids[:4]
        leg_day1 = legs[:4]
        id_dic2 = dict.fromkeys(place_ids[4:8], {})
        routes[day_2] = id_dic2
        id_list2 = place_ids[4:8]
        leg_day2 = legs[4:8]
    if number_dates == 3:
        id_dic1 = dict.fromkeys(place_ids[:4], {})
        routes[day_1] = id_dic1
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]
        id_dic2 = dict.fromkeys(place_ids[4:8], {})
        routes[day_2] = id_dic2
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]
        id_dic3 = dict.fromkeys(place_ids[8:11], {})
        routes[day_3] = id_dic3
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]
    if number_dates >= 4:
        id_dic1 = dict.fromkeys(place_ids[:4], {})
        routes[day_1] = id_dic1
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]
        id_dic2 = dict.fromkeys(place_ids[4:8], {})
        routes[day_2] = id_dic2
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]
        id_dic3 = dict.fromkeys(place_ids[8:11], {})
        routes[day_3] = id_dic3
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]
        id_dic4 = dict.fromkeys(place_ids[11:], {})
        routes[day_4] = id_dic4
        id_list4 = place_ids[11:]
        leg_day4 = legs[11:]

    arrival_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
    departure_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
    spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)

    if (leg_day1):
        for val in range(len(leg_day1)):
            if val == 0:
                routes[day_1][id_list1[val]]['arrival_time'] = arrival_time
                routes[day_1][id_list1[val]]['departure_time'] = departure_time
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day1[val - 1]['duration']['value'])
                routes[day_1][id_list1[val]]['arrival_time'] = departure_time + travel_time
                arrival_time = departure_time + travel_time
                routes[day_1][id_list1[val]]['departure_time'] = arrival_time + spend_time
                departure_time = arrival_time + spend_time

    if (leg_day2):
        for val in range(len(leg_day2)):
            if val == 0:
                routes[day_2][id_list2[val]]['arrival_time'] = arrival_time
                routes[day_2][id_list1[val]]['departure_time'] = departure_time
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day2[val - 1]['duration']['value'])
                routes[day_2][id_list2[val]]['arrival_time'] = departure_time + travel_time
                arrival_time = departure_time + travel_time
                routes[day_2][id_list2[val]]['departure_time'] = arrival_time + spend_time
                departure_time = arrival_time + spend_time

    if (leg_day3):
        for val in range(len(leg_day3)):
            if val == 0:
                routes[day_3][id_list3[val]]['arrival_time'] = arrival_time
                routes[day_3][id_list3[val]]['departure_time'] = departure_time
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day3[val - 1]['duration']['value'])
                routes[day_3][id_list3[val]]['arrival_time'] = departure_time + travel_time
                arrival_time = departure_time + travel_time
                routes[day_3][id_list3[val]]['departure_time'] = arrival_time + spend_time
                departure_time = arrival_time + spend_time

    if (leg_day4):
        for val in range(len(leg_day4)):
            if val == 0:
                routes[day_4][id_list4[val]]['arrival_time'] = arrival_time
                routes[day_4][id_list4[val]]['departure_time'] = departure_time
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day4[val - 1]['duration']['value'])
                routes[day_4][id_list4[val]]['arrival_time'] = departure_time + travel_time
                arrival_time = departure_time + travel_time
                routes[day_4][id_list4[val]]['departure_time'] = arrival_time + spend_time
                departure_time = arrival_time + spend_time
