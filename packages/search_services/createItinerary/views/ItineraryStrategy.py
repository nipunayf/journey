class ItineraryStrategy:
    def __init__(self, preferences, itinerary_strategy=None):
        self.preferences = preferences
        self.itinerary_strategy = itinerary_strategy

    def create_itinerary(self):
        global itinerary
        if self.itinerary_strategy:
            itinerary: object = self.itinerary_strategy(self)
        return itinerary

