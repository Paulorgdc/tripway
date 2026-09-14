"""
API viewsets for Trip resource endpoints.
"""

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from .models import Trip
from .serializers import TripSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    """
    Custom session authentication class that bypasses CSRF checks
    for API prototyping and decoupled SPA clients.
    """
    def enforce_csrf(self, request):
        return


class TripViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user-specific travel itineraries.
    """
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def get_queryset(self):
        return Trip.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)