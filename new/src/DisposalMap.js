import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import disposalLocations from './expanded_recycling_centers.json';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 17.3850,
  lng: 78.4867,
};

function DisposalMap({ category = 'plastic' }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (category && disposalLocations[category]) {
      setLocations(disposalLocations[category]);
    } else {
      setLocations([]);
    }
  }, [category]);

  const handleMarkerClick = (loc) => {
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${loc.lat},${loc.lng}`;
          window.open(directionsUrl, '_blank');
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED || error.code === error.POSITION_UNAVAILABLE) {
            alert("Location is off or permission denied. Please enable location services to get directions.");
          } else if (error.code === error.TIMEOUT) {
            alert("Location request timed out. Try again.");
          } else {
            alert("Unable to get your location. Please check your location settings.");
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {locations.map((loc, index) => (
        <Marker
          key={index}
          position={{ lat: loc.lat, lng: loc.lng }}
          title={loc.name}
          onClick={() => handleMarkerClick(loc)}
        />
      ))}
    </GoogleMap>
  ) : (
    <p>Loading map...</p>
  );
}

export default DisposalMap;
