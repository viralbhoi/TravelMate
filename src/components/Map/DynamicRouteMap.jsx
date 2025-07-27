// src/components/Map/DynamicRouteMap.jsx

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  GoogleMap,
  MarkerF,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

const containerStyle = {
  width: '88%',
  height: '85%',
};
const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Center of India

export default function DynamicRouteMap({
  pickup,
  drop,
  onPickupSet,
  onDropSet,
  interactive = true,
}) {
  const [LIBRARIES] = useState(['places']);
  const [directions, setDirections] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setMapCenter({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      (err) => console.warn('Geolocation not allowed:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleMapClick = useCallback(
    (e) => {
      if (!interactive) return;

      const loc = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };


      if (!pickup) onPickupSet(loc);

      else if (!drop) onDropSet(loc);
    },
    [pickup, drop, interactive, onPickupSet, onDropSet]
  );

  useEffect(() => {
    if (!isLoaded || !pickup || !drop || !window.google?.maps?.DirectionsService) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: pickup,
        destination: drop,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  }, [isLoaded, pickup, drop]);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      <div className="w-screen h-screen relative">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={pickup || mapCenter}
          zoom={14}
          onLoad={(map) => (mapRef.current = map)}
          onClick={handleMapClick}
        >
          {pickup && <MarkerF position={pickup} label="P" />}
          {drop && <MarkerF position={drop} label="D" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>



      </div>
      <div
        className="z-10 absolute sm:bottom-4 bottom-8 left-7 bg-white shadow-md rounded-lg p-2 text-xs w-[200px]"
      >
        <div className="font-semibold text-gray-700 mb-1">Route Info</div>
        <div className="text-gray-600">
          <p>
            <strong>P:</strong>{' '}
            {pickup ? `${pickup.lat.toFixed(2)}, ${pickup.lng.toFixed(2)}` : 'Set'}
          </p>
          <p>
            <strong>D:</strong>{' '}
            {drop ? `${drop.lat.toFixed(2)}, ${drop.lng.toFixed(2)}` : 'Set'}
          </p>
        </div>
        {(pickup || drop) && (
          <button
            onClick={() => {
              onPickupSet(null);
              onDropSet(null);
              setDirections(null);
            }}
            className="mt-2 w-full bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
          >
            Reset
          </button>
        )}
      </div>

    </>
  );
}
