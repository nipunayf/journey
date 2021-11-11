from rest_framework.response import Response
from rest_framework.views import APIView
from ..helper import search

import json
import requests


class NearbySearcher(APIView):
    def get(self, parameters):
        parameters = json.loads(parameters.body.decode("utf-8"))
        result = search.search(parameters)
        return Response({"results": result})
