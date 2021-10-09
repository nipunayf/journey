from rest_framework.response import Response
from rest_framework.views import APIView
import json
from ..strategy import ItineraryStrategy
from ..strategy.ruleBased import main


class ItineraryCreator(APIView):
    def get(self, parameters):
        rulebased = ItineraryStrategy.ItineraryStrategy(main.RuleBasedMain(parameters))
        route = rulebased.execute()
        return Response(route)
