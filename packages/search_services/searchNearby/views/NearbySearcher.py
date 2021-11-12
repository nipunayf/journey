from rest_framework.response import Response
from rest_framework.views import APIView
from ..helper import search

import json
import requests


class NearbySearcher(APIView):
    def post(self, parameters):
        try:
            parameters = json.loads(parameters.body.decode("utf-8"))
            result = search.search(parameters)
            return Response({
                "results": result,
                "message": "success"
            })
        except:
            return Response({
                "results": None,
                "message": "Sorry Couldn't Find Nearby Places"
            })
