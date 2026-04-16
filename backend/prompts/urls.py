from django.urls import path
from . import views

urlpatterns = [
    path('trending/', views.trending_prompts),  # MUST BE FIRST
    path('<int:id>/', views.get_prompt),
    path('', views.get_prompts),
]