import math
from sklearn import preprocessing
import numpy as np
import itertools
import datetime
import json
from ...helper import enums, MapApis


# Helper functions
def initialPlaces(parameters):
    itinerary = None
    # destination_id = parameters.destination_id
    # destination_name = parameters.name
    # number_dates = parameters.number_dates
    # dates = parameters.dates
    preferences = parameters['preferences']

    # popularity = preferences.popularity
    # budget = preferences.budget

    nature = preferences['nature']
    entertainment = preferences['entertainment']
    relax = preferences['relax']

    dic = {'NATURE': nature, 'ENTERTAINMENT': entertainment, 'RELAX': relax}

    person_type = []
    person_keyword = []

    for key in dic:
        NOT_KEY = f'NOT_{key}'
        type_key = enums.Types[key].value
        type_not_key = enums.Types[NOT_KEY].value
        keyword_key = enums.Keywords[key].value
        keyword_not_key = enums.Keywords[NOT_KEY].value
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
        r = MapApis.nearbySearch(parameters, keyword)
        for i in r:
            if i['place_id'] in results:
                pass
            else:
                results[i['place_id']] = i

    # return places according to the preferences(keywords)
    print("result printing")
    print(results)
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

    lat = parameters['location']['lat']
    lng = parameters['location']['lng']

    for key in results_copy:
        distance = getDistance(lat, lng, results_copy[key]['geometry']['location']['lat'],
                               results_copy[key]['geometry']['location']['lng'])
        results_copy[key]['distance_from_origin'] = distance

    # results_copy = sorted(results_copy.items(), key=lambda x: x[1]['distance_from_origin'])
    with open("sorted_distance.json", 'w', encoding='utf-8') as f:
        f.write(json.dumps(results_copy))
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

    return results_copy


def itinerary(parameters, results):
    leg_day1, leg_day2, leg_day3, leg_day4 = 0, 0, 0, 0
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

    times = ['arrival_time', 'departure_time']
    if number_dates == 1:
        id_dic1 = {id: dict.fromkeys(times) for id in place_ids[:5]}
        id_list1 = place_ids[:5]
        routes['day_1'] = id_dic1
        leg_day1 = legs[:5]
    if number_dates == 2:
        id_dic1 = {id: dict.fromkeys(times) for id in place_ids[:4]}
        routes['day_1'] = id_dic1
        id_list1 = place_ids[:4]
        leg_day1 = legs[:4]
        id_dic2 = {id: dict.fromkeys(times) for id in place_ids[4:8]}
        routes['day_2'] = id_dic2
        id_list2 = place_ids[4:8]
        leg_day2 = legs[4:8]
    if number_dates == 3:
        id_dic1 = {id: dict.fromkeys(times) for id in place_ids[:4]}
        routes['day_1'] = id_dic1
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]
        id_dic2 = {id: dict.fromkeys(times) for id in place_ids[4:8]}
        routes['day_2'] = id_dic2
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]
        id_dic3 = {id: dict.fromkeys(times) for id in place_ids[8:11]}
        routes['day_3'] = id_dic3
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]
    if number_dates >= 4:
        id_dic1 = {id: dict.fromkeys(times) for id in place_ids[:4]}
        routes['day_1'] = id_dic1
        leg_day1 = legs[:4]
        id_list1 = place_ids[:4]
        id_dic2 = {id: dict.fromkeys(times) for id in place_ids[4:8]}
        routes['day_2'] = id_dic2
        leg_day2 = legs[4:8]
        id_list2 = place_ids[4:8]
        id_dic3 = {id: dict.fromkeys(times) for id in place_ids[8:11]}
        routes['day_3'] = id_dic3
        id_list3 = place_ids[8:11]
        leg_day3 = legs[8:11]
        id_dic4 = {id: dict.fromkeys(times) for id in place_ids[11:]}
        routes['day_4'] = id_dic4
        id_list4 = place_ids[11:]
        leg_day4 = legs[11:]



    if leg_day1 != 0:
        arrival_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day1)):
            # print('idlist1val:', id_list1[val])
            # print(routes['day_1'])
            id = id_list1[val]
            # print(id)
            if val == 0:
                routes['day_1'][id]['arrival_time'] = str(arrival_time)
                routes['day_1'][id]['departure_time'] = str(departure_time)

            elif val == 3:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival_time = departure_time + travel_time + lunch_time
                # print(arrival_time)
                routes['day_1'][id]['arrival_time'] = str(arrival_time)

                departure_time = arrival_time + spend_time
                # print(departure_time)
                routes['day_1'][id]['departure_time'] = str(departure_time)
            else:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                # print(travel_time)

                arrival_time = departure_time + travel_time
                # print(arrival_time)
                routes['day_1'][id]['arrival_time'] = str(arrival_time)

                departure_time = arrival_time + spend_time
                # print(departure_time)
                routes['day_1'][id]['departure_time'] = str(departure_time)

    if leg_day2 != 0:
        arrival_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure_time = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day2)):
            if val == 0:
                routes['day_2'][id_list2[val]]['arrival_time'] = str(arrival_time)
                routes['day_2'][id_list2[val]]['departure_time'] = str(departure_time)
            elif val == 2:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival_time = departure_time + travel_time + lunch_time
                # print(arrival_time)
                routes['day_2'][id_list2[val]]['arrival_time'] = str(arrival_time)

                departure_time = arrival_time + spend_time
                # print(departure_time)
                routes['day_2'][id_list2[val]]['departure_time'] = str(departure_time)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day2[val - 1]['duration']['value'])
                routes['day_2'][id_list2[val]]['arrival_time'] = str(departure_time + travel_time)
                arrival_time = departure_time + travel_time
                routes['day_2'][id_list2[val]]['departure_time'] = str(arrival_time + spend_time)
                departure_time = arrival_time + spend_time

    if leg_day3 != 0:
        arrival_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure_time = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day3)):
            if val == 0:
                routes['day_3'][id_list3[val]]['arrival_time'] = str(arrival_time)
                routes['day_3'][id_list3[val]]['departure_time'] = str(departure_time)
            elif val == 2:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival_time = departure_time + travel_time + lunch_time
                # print(arrival_time)
                routes['day_3'][id_list3[val]]['arrival_time'] = str(arrival_time)

                departure_time = arrival_time + spend_time
                # print(departure_time)
                routes['day_3'][id_list3[val]]['departure_time'] = str(departure_time)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day3[val - 1]['duration']['value'])
                routes['day_3'][id_list3[val]]['arrival_time'] = str(departure_time + travel_time)
                arrival_time = departure_time + travel_time
                routes['day_3'][id_list3[val]]['departure_time'] = str(arrival_time + spend_time)
                departure_time = arrival_time + spend_time

    if leg_day4 != 0:
        arrival_time = datetime.timedelta(hours=8, minutes=00, seconds=00)
        departure_time = datetime.timedelta(hours=10, minutes=00, seconds=00)
        spend_time = datetime.timedelta(hours=0, minutes=00, seconds=7200)
        for val in range(len(leg_day4)):
            if val == 0:
                routes['day_4'][id_list4[val]]['arrival_time'] = str(arrival_time)
                routes['day_4'][id_list4[val]]['departure_time'] = str(departure_time)
            elif val == 2:
                second = leg_day1[val - 1]['duration']['value']
                travel_time = datetime.timedelta(seconds=second)
                lunch_time = datetime.timedelta(seconds=3600)
                # print(travel_time)

                arrival_time = departure_time + travel_time + lunch_time
                # print(arrival_time)
                routes['day_4'][id_list4[val]]['arrival_time'] = str(arrival_time)

                departure_time = arrival_time + spend_time
                # print(departure_time)
                routes['day_4'][id_list4[val]]['departure_time'] = str(departure_time)
            else:
                travel_time = datetime.timedelta(hours=0, minutes=00, seconds=leg_day4[val - 1]['duration']['value'])
                routes['day_4'][id_list4[val]]['arrival_time'] = str(departure_time + travel_time)
                arrival_time = departure_time + travel_time
                routes['day_4'][id_list4[val]]['departure_time'] = str(arrival_time + spend_time)
                departure_time = arrival_time + spend_time

    print('ROUTE',routes)
    for day in routes:
        print(routes[day])
        for id in routes[day]:
            print(id)
            routes[day][id]['result'] = results_copy[id]
        
    print(routes)
    return routes
