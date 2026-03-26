from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Workout
from datetime import date

User = get_user_model()

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(user.username, 'testuser')

class TeamModelTest(TestCase):
    def test_create_team(self):
        user = User.objects.create_user(username='member', password='pass')
        team = Team.objects.create(name='TeamA')
        team.members.add(user)
        self.assertEqual(team.name, 'TeamA')
        self.assertIn(user, team.members.all())

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        user = User.objects.create_user(username='active', password='pass')
        team = Team.objects.create(name='TeamB')
        activity = Activity.objects.create(user=user, activity_type='Run', duration=30, calories_burned=300, date=date.today(), team=team)
        self.assertEqual(activity.activity_type, 'Run')

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups', description='Do 20 pushups')
        self.assertEqual(workout.name, 'Pushups')
