/**
 * @fileoverview Location search input with autocomplete suggestions powered by OpenStreetMap Nominatim.
 */

import React, { useState, useEffect } from "react";

export default function SearchMap({ onResult }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&addressdetails=1`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    onResult({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
  };

  return (
    <div className="position-relative">
      <div className="input-group shadow-sm" style={{ borderRadius: "12px", overflow: "visible" }}>
        <input
          type="text"
          className="form-control border-0 bg-light"
          placeholder="Busque cidade, bairro ou seu hotel..."
          style={{ padding: "12px 15px", boxShadow: "none" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-primary px-4 fw-bold"
          type="button"
          onClick={() => suggestions.length > 0 && handleSelect(suggestions[0])}
        >
          {isSearching ? "..." : "Buscar"}
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul
          className="list-group position-absolute w-100 shadow-lg mt-2"
          style={{ zIndex: 1000, borderRadius: "12px", overflow: "hidden" }}
        >
          {suggestions.map((place) => (
            <button
              key={place.place_id}
              type="button"
              className="list-group-item list-group-item-action text-start border-0"
              onClick={() => handleSelect(place)}
              style={{ fontSize: "0.85rem", padding: "10px 15px" }}
            >
              <span className="fw-bold text-dark">{place.name}</span>
              <br />
              <small className="text-muted">
                {place.display_name.replace(place.name + ", ", "")}
              </small>
            </button>
          ))}
        </ul>
      )}
    </div>
  );
}