from enum import Enum


class Types(Enum):
    COMMON = ['tourist_attraction', 'establishment', 'point_of_interest']
    NEGLECT = ['travel_agency', 'store', 'lodging', 'restaurant']

    NATURE = ['natural_feature', 'zoo', 'park']
    NOT_NATURE = ['museum', 'aquarium', 'art_gallery', 'hindu_temple']  # INDOOR

    RELAX = ['place_of_worship', 'natural_feature', 'park', 'art_gallery']
    NOT_RELAX = ['camp_ground']  # ADVENTURE

    ENTERTAINMENT = ['amusement_park', 'park', 'aquarium']
    NOT_ENTERTAINMENT = ['museum', 'art_gallery', 'hindu_temple', 'place_of_worship']  # KNOWLEDGE


class Keywords(Enum):
    NATURE = ['park', 'nature']
    NOT_NATURE = ['museum', 'aquarium', 'art_gallery', 'hindu_temple', 'indoor']
    RELAX = ['place_of_worship', 'park', 'relax', 'nature']
    NOT_RELAX = ['camp_ground', 'hiking', 'adventure']
    ENTERTAINMENT = ['beach', 'amusement_park', 'park', 'aquarium', 'entertainment']
    NOT_ENTERTAINMENT = ['museum', 'place_of_worship', 'art_gallery', 'hindu_temple', 'ancient', 'temple', 'knowledge']
