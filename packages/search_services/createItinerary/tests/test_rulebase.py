from django.test import TestCase
from ..strategy.ruleBased import RuleBasedItinerary
from ..helper import enums, MapApis
import json


class RuleBasesTest(TestCase):
    def test_create_person_keyword(self):
        keyword = {'amusement_park', 'aquarium', 'park', 'hindu_temple', 'beach', 'indoor', 'art_gallery',
                   'place_of_worship', 'nature', 'relax', 'museum'}
        parameters = json.load(open("createItinerary/tests/fixtures/parameters.json"))

        preferences = parameters['preferences']
        nature = preferences['nature']
        entertainment = preferences['entertainment']
        relax = preferences['relax']

        dic = {'NATURE': nature, 'ENTERTAINMENT': entertainment, 'RELAX': relax}

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
    # def test_nearby_search_result(self):
    #
    # def test_initial_place(self):
    #     parameters = 'fixtures/parameters.json'
    #     self.assertEqual()
