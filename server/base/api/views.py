from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import NoteSerializer, UserSerializer
from base.models import Note
from django.contrib.auth.models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# shorteners
# req = request
# res = response

# NOTES
# In Django, when defining views, you typically use the request parameter to 
# represent the incoming HTTP request. If you want to use a shorter name, such as 
# req, you can do so by simply renaming the parameter in your view functions. 
# ...You can use any valid variable name that adheres to Python naming conventions. 
# This won't affect the functionality; it's just a matter of personal preference for 
# code readability.

# for signup and login going to start doing
# username, email, password, confirm password since that looks like the standard
# and login will be using just username and password or email and password


# routes
@api_view(['GET'])
def getRoutes(req):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]
    
    return Response(routes)

# user auth
@api_view(['POST'])
def regUser(req):
    data = req.data
    serializer = UserSerializer(data = data)

    if serializer.is_valid():
        # create_user() handles the hashing of the password in django
        user = User.objects.create_user(
            username= req.data.get('username'),
            email= req.data.get('email'),
            password= req.data.get('password')
        )
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getNotes(req):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)
    # permission_classes = [IsAuthenticated]
    return Response(serializer.data)