"""
API endpoints for user authentication including registration and login handlers.
"""

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register_view(request):
    """
    Handles new user account registration.
    Supports both single 'name' or separate 'first_name'/'username' payloads.
    """
    first_name = (request.data.get('first_name') or request.data.get('name') or '').strip()
    email = request.data.get('email', '').strip().lower()
    username = (request.data.get('username') or email).strip().lower()
    password = request.data.get('password')

    if not email or not password or not username:
        return Response(
            {'error': 'Por favor, preencha todos os campos obrigatórios.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Este nome de usuário já está em uso.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Este e-mail já está cadastrado.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(
            username=username, 
            email=email, 
            password=password, 
            first_name=first_name
        )
        return Response(
            {'message': 'Usuário cadastrado com sucesso!'}, 
            status=status.HTTP_201_CREATED
        )
    except Exception:
        return Response(
            {'error': 'Ocorreu um erro ao criar a conta.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def login_view(request):
    """
    Authenticates user credentials and establishes a session.
    Supports login via either e-mail or username.
    """
    identifier = (request.data.get('email') or request.data.get('username') or '').strip().lower()
    password = request.data.get('password')

    if not identifier or not password:
        return Response(
            {'error': 'Por favor, informe o e-mail/usuário e a senha.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(request, username=identifier, password=password)

    if user is not None:
        login(request, user)
        return Response({
            "message": "Bem-vindo de volta!",
            "user": {
                "id": user.id,
                "username": user.username,
                "name": user.first_name or user.username
            }
        }, status=status.HTTP_200_OK)

    return Response(
        {"error": "E-mail/usuário ou senha incorretos."}, 
        status=status.HTTP_400_BAD_REQUEST
    )