from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('', views.ItineraryCreator.ItineraryCreator.as_view()),
]
