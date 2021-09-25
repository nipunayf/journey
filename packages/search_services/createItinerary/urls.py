from django.urls import path
from . import views

urlpatterns = [
    path('/', views.ItineraryStrategy.create_itinerary.as_view() ),
]