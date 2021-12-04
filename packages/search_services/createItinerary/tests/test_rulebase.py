from django.test import TestCase
from unittest.mock import Mock, patch
from ..strategy.ruleBased import RuleBasedItinerary
from ..helper import enums, MapApis
import json


class RuleBasedTest(TestCase):
    def test_create_person_keyword(self):
        keyword = {'amusement_park', 'aquarium', 'park', 'hindu_temple', 'beach', 'indoor', 'art_gallery',
                   'place_of_worship', 'nature', 'relax', 'museum'}
        parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))

        preferences = parameters['preferences']
        introversion = preferences['introversion']
        knowledge = preferences['knowledge']
        energy = preferences['energy']

        dic = {'INTROVERSION': introversion, 'KNOWLEDGE': knowledge, 'ENERGY': energy}

        self.assertEqual(RuleBasedItinerary.createPersonKeyword(dic), keyword)

    def test_filter_place(self):
        input = json.load(open("createItinerary/tests/fixtures/nearby_search_result.json"))
        output = json.load(open("createItinerary/tests/fixtures/filter_type_results.json"))

        self.assertEqual(type(RuleBasedItinerary.filterPlacesbyType(input)), type(output))

    def test_get_distance(self):
        input = (7.291418, 80.636696, 7.054653399999999, 80.69974309999999)
        output = 27.23037099634782

        self.assertEqual(RuleBasedItinerary.getDistance(input[0], input[1], input[2], input[3]), output)
        self.assertTrue(type(input[0]) == type(output))

    def test_ranking(self):
        input = json.load(open("createItinerary/tests/fixtures/sorted_distance.json"))
        output = json.load(open("createItinerary/tests/fixtures/ranking.json"))

        self.assertEqual(RuleBasedItinerary.ranking(input), output)

    def test_itinerary(self):
        # Call the service to hit the mocked API.
        with patch('createItinerary.helper.MapApis.direction') as mock_direction:
            direction_result = json.load(open("createItinerary/tests/fixtures/direction_map.json"))
            mock_direction.return_value.ok = True
            mock_direction.return_value = direction_result

            parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))
            ranking_result = json.load(open("createItinerary/tests/fixtures/ranking.json"))
            route = json.load(open("createItinerary/tests/fixtures/final_route.json"))
            mocked = RuleBasedItinerary.itinerary(parameters, ranking_result)

            self.assertEqual(type(mocked), type(route))


class MapApiTest(TestCase):
    def test_nearby_search(self):
        # Call the service to hit the actual API.
        """
        parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))
        actual = MapApis.nearbySearch(parameters, 'museum')
        actual_keys = actual.json().pop().keys()
        """

        # Call the service to hit the mocked API.
        with patch('createItinerary.helper.MapApis.nearbySearch') as mock_search:
            result = json.load(open("createItinerary/tests/fixtures/nearby_map.json"))
            mock_search.return_value.ok = True
            mock_search.return_value = result

            parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))
            mocked = MapApis.nearbySearch(parameters, 'museum')
            # mocked_keys = mocked.json().pop().keys()

        self.assertEqual(mocked, result)

    def test_direction(self):
        # Call the service to hit the actual API.
        """
        parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))
        ranking_result = json.load(open("createItinerary/tests/fixtures/ranking.json"))
        actual = MapApis.direction(parameters, ranking_result)
        actual_keys = actual.json().pop().keys()
        """

        # Call the service to hit the mocked API.
        with patch('createItinerary.helper.MapApis.direction') as mock_direction:
            result = json.load(open("createItinerary/tests/fixtures/direction_map.json"))
            mock_direction.return_value.ok = True
            mock_direction.return_value = result

            parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))
            ranking_result = json.load(open("createItinerary/tests/fixtures/ranking.json"))
            mocked = MapApis.direction(parameters, ranking_result)
            # mocked_keys = mocked.json().pop().keys()

        self.assertEqual(mocked, result)
