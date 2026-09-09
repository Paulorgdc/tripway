# 🌍 TRIPWAY: Travel Planning & Itinerary Optimization Platform

TRIPWAY is an academic all-in-one travel planning platform designed to streamline route building, centralize access to points of interest, and optimize travel experiences.

[![Category](https://img.shields.io/badge/CATEGORY-ACADEMIC%20PROJECT-e0004d?style=for-the-badge)](#)
[![UNIVAG](https://img.shields.io/badge/UNIVAG-555555?style=for-the-badge)](#)
[![Course](https://img.shields.io/badge/PROJETO%20INTEGRADOR%20EXTENSIONISTA-00c8ff?style=for-the-badge)](#)
[![License](https://img.shields.io/badge/LICENSE-MIT-76b900?style=for-the-badge)](#)

---

## 📌 Project Overview

TRIPWAY was developed as an academic project during the *Projeto Integrador Extensionista* for the Bachelor's degree in Software Engineering at UNIVAG.

The platform provides a digital solution for travelers to plan, search, and manage customized itineraries. By integrating Leaflet maps, Overpass API geolocation, and Progressive Web App (PWA) technology, the system ensures interactive route generation and accessible offline navigation across devices.

---

## ⚡ Tech Stack

- **Backend:** Python, Django, Django REST Framework (DRF)
- **Frontend:** React, Vite, Bootstrap
- **Mapping & Geolocation:** Leaflet, React-Leaflet, Leaflet-GeoSearch, Overpass API
- **PWA & Tooling:** `vite-plugin-pwa`, Axios

---

## 🚀 Key Features

- **Interactive Route Planning:** Custom map interface powered by Leaflet and Overpass API to locate attractions, accommodations, and dining options.
- **Dual Authentication:** Flexible credential validation supporting either email or username via a custom Django authentication backend.
- **Progressive Web App (PWA):** Installable web application with offline capabilities and responsive cross-device navigation.
- **Itinerary Management:** Real-time creation, editing, customization, and persistent storage of multi-destination travel routes.
- **API & Security Architecture:** Pre-configured CORS and CSRF mechanisms ensuring secure communication between DRF and React.

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Paulorgdc/tripway.git
   cd tripway