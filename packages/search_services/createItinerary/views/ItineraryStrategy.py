from rest_framework.response import Response
from rest_framework.views import APIView
from . import RuleBasedItinerary
import json


class ItineraryCreator(APIView):
    def get(self,parameters):
        parameters = json.loads(parameters.body.decode("utf-8"))
        initial_places = RuleBasedItinerary.initialPlaces(parameters)
        filterPlacesbyType = RuleBasedItinerary.filterPlacesbyType(initial_places)
        sortbyDistance = RuleBasedItinerary.sortbyDistance(parameters, filterPlacesbyType)
        ranking = RuleBasedItinerary.ranking(sortbyDistance)
        route = RuleBasedItinerary.itinerary(parameters, ranking)

        return Response(route)

