from rest_framework.views import APIView
from . import RuleBasedItinerary


class ItineraryStrategy(APIView):
    def __init__(self, itinerary_strategy=None, **kwargs):
        super().__init__(**kwargs)
        self.itinerary_strategy = itinerary_strategy

    def create_itinerary(self):
        global itinerary
        if self.itinerary_strategy:
            itinerary: object = self.itinerary_strategy(self)
        return itinerary


if __name__ == "main":
    ItineraryStrategy(itinerary_strategy=RuleBasedItinerary)
