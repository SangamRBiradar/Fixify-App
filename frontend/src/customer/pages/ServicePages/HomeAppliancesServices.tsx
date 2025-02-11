import React, { useState } from "react";
import Services from "../Home/ServicesCards/Services";
import { Switch, FormControlLabel, Divider } from "@mui/material";
import Location from "../../../Location/Location";
import Pagination from "../../components/Pagination/Pagination";

const homeAppliancesServicesData = [
  { title: "Washing Machine Repair", image: "/images/washing-machine-repair.jpg" },
  { title: "Refrigerator Repair", image: "/images/refrigerator-repair.jpg" },
  { title: "Microwave Repair", image: "/images/microwave-repair.jpg" },
  { title: "Dishwasher Installation", image: "/images/dishwasher-installation.jpg" },
];

const HomeAppliancesServices = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [services, setServices] = useState(homeAppliancesServicesData); // Default service data
  const [page, setPage] = useState(1); // Track current page

  // Handle pagination changes
  const handlePageChange = (value: number) => {
    setPage(value);
  };

  // Toggle location state
  const handleLocationToggle = () => {
    setLocationEnabled((prev) => !prev);
  };

  // Fetch services by location with pagination support
  const fetchServicesByLocation = (latitude: number, longitude: number) => {
    let category = "home-appliances"; // Category for home appliances

    // Fetch nearby services based on location and pagination
    fetch(`/api/products/nearby?category=${category}&latitude=${latitude}&longitude=${longitude}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Sorted Home Appliances Services: ", data);
        displayServices(data);
      })
      .catch((error) => {
        console.error("Error fetching home appliances services:", error);
      });
  };

  // Display the fetched services
  const displayServices = (services: any[]) => {
    if (services.length === 0) {
      setServices([]); // Update state with empty array if no services are found
    } else {
      setServices(services); // Update state with fetched services
    }
  };

  // Handle location changes from Location component
  const handleLocationChange = (latitude: number, longitude: number) => {
    fetchServicesByLocation(latitude, longitude);
  };

  return (
    <div>
      {/* Header */}
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <h4 className="font-bold text-xl text-blue-900 text-center uppercase">Home Appliances Services</h4>
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
            labelPlacement="start"
          />
        </div>
      </div>

      <Divider />
      <Divider />
      <Divider />

      {/* Location Component */}
      <Location locationEnabled={locationEnabled}
       onLocationChange={handleLocationChange} />

      {/* Displaying services */}
      <div>
        <Services />
      </div>

      {/* Pagination */}
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

export default HomeAppliancesServices;
