// Location.tsx

import React, { useState, useEffect } from "react";

interface LocationProps {
  onLocationChange: (latitude: number, longitude: number) => void;
  onStatusChange?: (status: string) => void; 
  locationEnabled: boolean;
}

const Location: React.FC<LocationProps> = ({ onLocationChange, onStatusChange, locationEnabled }) => {
  const [locationStatus, setLocationStatus] = useState<string>("");

  // Function to fetch the user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("User Location: ", latitude, longitude);

          // Call the onLocationChange prop to pass back the location
          onLocationChange(latitude, longitude);
          if (onStatusChange) onStatusChange("Location fetched successfully."); // Call only if defined
        },
        (error) => {
          console.log("Error getting location: ", error);
          if (onStatusChange) onStatusChange("Error getting location. Please enable location services.");
        }
      );
    } else {
      if (onStatusChange) onStatusChange("Geolocation is not supported by this browser.");
    }
  };

  // Effect to handle location fetching when the toggle is switched on
  useEffect(() => {
    if (locationEnabled) {
      setLocationStatus("Fetching live location...");
      getUserLocation();
    } else {
      setLocationStatus("Turn on location to find nearby services.");
      onLocationChange(0, 0); // Reset location when disabled
    }
  }, [locationEnabled, onLocationChange]);

  return <div>{/* No need to display status on the UI anymore */}</div>;
};

export default Location;
