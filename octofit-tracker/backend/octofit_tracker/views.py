from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Team, Activity, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, WorkoutSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.IsAuthenticated]

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    permission_classes = [permissions.IsAuthenticated]

@api_view(['GET'])
def leaderboard(request):
    # Example: leaderboard by total calories burned per user
    leaderboard_data = (
        Activity.objects.values('user__username')
        .order_by('-calories_burned')
        .annotate(total_calories=models.Sum('calories_burned'))
    )
    return Response(leaderboard_data)

@api_view(['GET'])
def api_root(request):
    return Response({
        'users': '/api/users/',
        'teams': '/api/teams/',
        'activities': '/api/activities/',
        'workouts': '/api/workouts/',
        'leaderboard': '/api/leaderboard/',
    })
