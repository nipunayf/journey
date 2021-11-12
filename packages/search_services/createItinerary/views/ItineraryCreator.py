from rest_framework.response import Response
from rest_framework.views import APIView
import json
from ..strategy import ItineraryStrategy
from ..strategy.ruleBased import main


class ItineraryCreator(APIView):
    def post(self, parameters):
        try:
            rulebased = ItineraryStrategy.ItineraryStrategy(main.RuleBasedMain)
            route = rulebased.execute(parameters)
            return Response({"results": route,
                             "message": 'success'})
        except Exception as e:
            print("exception occured at itinearry creator",e)
            return Response({"results": None,
                             "message": "Sorry couldn't Create an Itinerary"})
