import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import React, { useEffect, useState } from "react";

const LiveTrackingCaptain = (props) => {
  // const [userLocation, setUserLocation] = useState({
  //   lat: 37.7749,
  //   lng: -122.4194,
  // });

  useEffect(() => {
    let interval;
    if (navigator.geolocation) {
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(`Position updated :` , position.coords.latitude,position.coords.longitude);
            props.setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude,
              },
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

  const [pickupCoordinates, setPickupCoordinates] = useState({});
  // console.log(props.ride?.pickup);

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
          {
            params: {
              address: props.ride?.pickup, // Make sure to pass the address as a query parameter
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authentication token
            },
          }
        );
        // Handle the response data here
        // console.log(response.data);
        setPickupCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (props.ride?.pickup) {
      getCoordinates();
    }
  }, [props.ride?.pickup]);

  const[destinationCoordinates, setDestinationCoordinates] = useState({});

  useEffect(() => {
    const getCoordinates = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/maps/get-coordinates`,
          {
            params: {
              address: props.ride?.destination, // Make sure to pass the address as a query parameter
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add authentication token
            },
          }
        );
        // Handle the response data here
        // console.log(response.data);
        setDestinationCoordinates(response.data);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    if (props.ride?.destination) {
      getCoordinates();
    }
  }, [props.ride?.destination]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={{
          lat: props.userLocation?.lat,
          lng: props.userLocation?.lng,
        }}
        zoom={15}
      >
        {props.userLocation && (
          <Marker
            position={props.userLocation}
            icon={props.ride?.vehicleType == "car" ? { 
              url: "https://cdn-icons-png.flaticon.com/512/744/744465.png",
              scaledSize: new window.google.maps.Size(40, 45),
            } : props.ride?.vehicleType == "moto" ? {
              url:"http://maps.google.com/mapfiles/ms/icons/cycling.png",
              scaledSize: new window.google.maps.Size(30, 30),
            } : props.ride?.vehicleType == "auto" ? {
              url:"https://cdn-icons-png.flaticon.com/512/4786/4786827.png",
              scaledSize: new window.google.maps.Size(30, 30),
            } : {}}
          />
        )}
        {pickupCoordinates?.lat && pickupCoordinates?.lng && (
          <Marker
            position={pickupCoordinates}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/micons/green.png",
            }}
          />
        )}

        {destinationCoordinates?.lat && destinationCoordinates?.lng && (
          <Marker
            position={destinationCoordinates}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/micons/red.png",
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTrackingCaptain;
