import React, { useState } from 'react'
import Services from "../Home/ServicesCards/Services";
import { Switch, FormControlLabel, Divider } from "@mui/material";
import Location from "../../../Location/Location"; 
import Pagination from "../../components/Pagination/Pagination"


const electricalServicesData = [
  { title: "Electrical Wiring", image: "/images/electrical-wiring.jpg" },
  { title: "Lighting Installation", image: "/images/lighting-installation.jpg" },
  { title: "Circuit Breaker Repair", image: "/images/circuit-breaker-repair.jpg" },
  { title: "Outlet Installation", image: "/images/outlet-installation.jpg" },
];

const ElectricalServices = () => {
  // State to manage the toggle button for location
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [services, setServices] = useState(electricalServicesData);
  const [page,setPage]=useState(1)
  
    //pagination
    const handlePageChange = (value: number) => {
      setPage(value);
    };

  // Handler to toggle location state
  const handleLocationToggle = () => {
    setLocationEnabled((prev) => !prev);
  };

  // Function to update services based on location
  const fetchServicesByLocation = (latitude: number, longitude: number) => {
    let category = "electrical-services"; // Category specific for electrical services

    // Fetch nearby services based on location
    fetch(`/api/products/nearby?category=${category}&latitude=${latitude}&longitude=${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Sorted Electrical Services: ", data);
        displayServices(data); // Pass fetched data to the display function
      })
      .catch((error) => {
        console.log("Error fetching electrical services:", error);
      });
  };

  // Function to display fetched services
  const displayServices = (services: any[]) => {
    if (services.length === 0) {
      setServices([]); // No services found, update with an empty array
    } else {
      setServices(services); // Update state with fetched services
    }
  };

  // Handle the location change from the Location component
  const handleLocationChange = (latitude: number, longitude: number) => {
    fetchServicesByLocation(latitude, longitude);
  };

  return (
    <div>
      {/* Header with Electrical Services and Toggle Button */}
      <div className="grid grid-cols-3 items-center">
        {/* Empty div to balance the grid */}
        <div></div>

        {/* Centered "Electrical Services..." Text */}
        <h4 className="font-bold text-xl text-blue-900 text-center uppercase">Electrical Services...</h4>

        {/* Right-Aligned Toggle Button */}
        <div className="flex justify-end">
          <FormControlLabel
            control={
              <Switch
                checked={locationEnabled}
                onChange={handleLocationToggle}
                color="primary"
              />
            }
            label="Get NearBy Services"
            labelPlacement="start" // Place label on the left side of the switch
          />
        </div>
      </div>

      <Divider />
      <Divider />
      <Divider />

      {/* Location Component to manage location */}
      <Location
        locationEnabled={locationEnabled}
        onLocationChange={handleLocationChange}
      />

      {/* Displaying the electrical services list */}
      <div>
        <Services  />
      </div>

      <div className="flex justify-center pt-10">
      <Pagination
        page={page}
        onPageChange={handlePageChange}
        count={5}  
      />
          </div>
    </div>
  );
};

export default ElectricalServices;
