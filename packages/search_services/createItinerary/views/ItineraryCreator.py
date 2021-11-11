from rest_framework.response import Response
from rest_framework.views import APIView
import json
from ..strategy import ItineraryStrategy
from ..strategy.ruleBased import main


class ItineraryCreator(APIView):
    def post(self, parameters):
        rulebased = ItineraryStrategy.ItineraryStrategy(main.RuleBasedMain)
        route = rulebased.execute(parameters)
        return Response({"results": route})
