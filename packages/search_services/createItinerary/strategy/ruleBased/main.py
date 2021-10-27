from . import RuleBasedItinerary
import json


# main function
def RuleBasedMain(parameters):
    parameters = json.loads(parameters.body.decode("utf-8"))
    initial_places = RuleBasedItinerary.initialPlaces(parameters)
    filterPlacesbyType = RuleBasedItinerary.filterPlacesbyType(initial_places)
    sortbyDistance = RuleBasedItinerary.sortbyDistance(parameters, filterPlacesbyType)
    ranking = RuleBasedItinerary.ranking(sortbyDistance)
    route = RuleBasedItinerary.itinerary(parameters, ranking)

    return route
