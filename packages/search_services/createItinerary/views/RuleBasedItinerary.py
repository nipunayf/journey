import MapApis


def main():
    return None

def ruleBasedItinerary(parameters):
    itinerary = None
    destination_id = parameters.destination_id
    destination_name = parameters.name
    preferences = parameters.preferences
    number_dates = parameters.number_dates
    dates = parameters.dates

    text_search_results = MapApis.textSearch(preferences)


    return itinerary
