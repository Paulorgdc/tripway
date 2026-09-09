"""
REST Framework serializers for Trip and TripItem models.
"""

from rest_framework import serializers
from .models import Trip, TripItem


class TripItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripItem
        fields = ['id', 'day_key', 'name', 'time', 'lat', 'lng', 'weather_text', 'weather_icon']


class TripSerializer(serializers.ModelSerializer):
    items = TripItemSerializer(many=True)

    class Meta:
        model = Trip
        fields = ['id', 'title', 'created_at', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        trip = Trip.objects.create(**validated_data)
        for item_data in items_data:
            TripItem.objects.create(trip=trip, **item_data)
        return trip

    def update(self, instance, validated_data):
        items_data = validated_data.pop('items', None)
        instance.title = validated_data.get('title', instance.title)
        instance.save()

        if items_data is not None:
            instance.items.all().delete()
            for item_data in items_data:
                TripItem.objects.create(trip=instance, **item_data)

        return instance