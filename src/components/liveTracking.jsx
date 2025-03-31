import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

const LiveTracking = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });

  useEffect(() => {
    let interval;
    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(`Position updated :` , position.coords.latitude,position.coords.longitude);
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error(),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      };
      updateLocation(); // update immediately
      interval = setInterval(updateLocation, 10000);
    } else {
      // console.error("Geolocation is not supported by this browser.");
    }
    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={userLocation}
        zoom={15}
      >
        {userLocation && <Marker position={userLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;
