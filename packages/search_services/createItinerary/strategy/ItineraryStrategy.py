class ItineraryStrategy:
    def __init__(self, func=None):
        if func:
            self.execute = func

    def execute(self):
        print("Concrete function is not initialized")
