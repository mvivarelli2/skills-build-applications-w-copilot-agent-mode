from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, TeamViewSet, ActivityViewSet, LeaderboardViewSet, WorkoutViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
	path('', views.api_root, name='api_root'),
	path('leaderboard/', views.leaderboard, name='leaderboard'),
]

urlpatterns += router.urls
