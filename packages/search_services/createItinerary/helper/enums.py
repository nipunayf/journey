from enum import Enum


class Types(Enum):
    COMMON = ['tourist_attraction', 'establishment', 'point_of_interest']
    NEGLECT = ['travel_agency', 'store', 'lodging', 'restaurant']

    INTROVERSION = ['natural_feature', 'zoo', 'park']
    NOT_INTROVERSION = ['museum', 'aquarium', 'art_gallery', 'hindu_temple']  # INDOOR

    NOT_ENERGY = ['place_of_worship', 'natural_feature', 'park', 'art_gallery']
    ENERGY = ['camp_ground']  # ADVENTURE

    NOT_KNOWLEDGE = ['amusement_park', 'park', 'aquarium']
    KNOWLEDGE = ['museum', 'art_gallery', 'hindu_temple', 'place_of_worship']  # KNOWLEDGE


class Keywords(Enum):
    INTROVERSION = ['park', 'nature']
    NOT_INTROVERSION = ['museum', 'aquarium', 'art_gallery', 'hindu_temple', 'indoor']
    NOT_ENERGY= ['place_of_worship', 'park', 'relax', 'nature']
    ENERGY = ['camp_ground', 'hiking', 'adventure']
    NOT_KNOWLEDGE = ['beach', 'amusement_park', 'park', 'aquarium', 'entertainment']
    KNOWLEDGE = ['museum', 'place_of_worship', 'art_gallery', 'hindu_temple', 'ancient', 'temple', 'knowledge']
