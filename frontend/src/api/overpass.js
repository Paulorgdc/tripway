/**
 * @fileoverview Overpass API Integration for Points of Interest (POIs).
 * Fetches geographical elements from OpenStreetMap based on categories and coordinates.
 */

/**
 * Fetches points of interest (POIs) near specified geographical coordinates.
 * @param {string} category - POI category ('turismo', 'restaurante', 'hotel', 'posto')
 * @param {number} lat - Latitude coordinate
 * @param {number} lng - Longitude coordinate
 * @returns {Promise<Array<Object>>} List of mapped POI objects
 */
export async function fetchPOIs(category, lat, lng) {
  const radius = 5000; // 5km search radius
  let tags = "";

  if (category === "turismo") {
    tags = `
      node["tourism"="attraction"]["name"](around:${radius},${lat},${lng});
      node["tourism"="museum"]["name"](around:${radius},${lat},${lng});
      node["tourism"="viewpoint"]["name"](around:${radius},${lat},${lng});
      node["historic"="monument"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "restaurante") {
    tags = `
      node["amenity"="restaurant"]["name"](around:${radius},${lat},${lng});
      node["amenity"="cafe"]["name"](around:${radius},${lat},${lng});
      node["amenity"="bar"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "hotel") {
    tags = `
      node["tourism"="hotel"]["name"](around:${radius},${lat},${lng});
      node["tourism"="hostel"]["name"](around:${radius},${lat},${lng});
      node["tourism"="guest_house"]["name"](around:${radius},${lat},${lng});
    `;
  } else if (category === "posto") {
    tags = `node["amenity"="fuel"]["name"](around:${radius},${lat},${lng});`;
  } else {
    return [];
  }

  const query = `[out:json];(${tags});out 30;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.elements.map((element) => {
      let markerColor = "blue";
      if (category === "turismo") markerColor = "violet";
      if (category === "restaurante") markerColor = "orange";
      if (category === "hotel") markerColor = "green";
      if (category === "posto") markerColor = "black";

      return {
        id: element.id,
        lat: element.lat,
        lng: element.lon,
        title: element.tags.name,
        color: markerColor,
        isPoi: true,
        category: category,
      };
    });
  } catch (error) {
    console.error("Error fetching POIs from Overpass API:", error);
    return [];
  }
}