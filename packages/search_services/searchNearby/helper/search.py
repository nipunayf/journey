from . import map


def search(id):
    id = id['id']
    place_details = map.placeDetails(id)
    data = {'location': {
        'lat': place_details['geometry']['location']['lat'],
        'lng': place_details['geometry']['location']['lng']
    }
    }
    nearby = map.nearbySearch(data)
    result = {'place_details': place_details,
              'nearby': nearby}
    return result
