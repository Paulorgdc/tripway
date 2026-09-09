"""
Admin configuration for the Trips application.
"""

from django.contrib import admin
from .models import Trip, TripItem


class TripItemInline(admin.TabularInline):
    model = TripItem
    extra = 1


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at')
    search_fields = ('title', 'user__username', 'user__email')
    list_filter = ('created_at',)
    inlines = [TripItemInline]


@admin.register(TripItem)
class TripItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'trip', 'day_key', 'time', 'lat', 'lng')
    list_filter = ('day_key',)
    search_fields = ('name', 'trip__title')