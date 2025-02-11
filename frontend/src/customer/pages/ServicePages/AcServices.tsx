//use of Loading and setloading in all services

// The loading state and the setLoading function are used to manage
//  the user interface (UI) during an asynchronous operation,
//   like fetching data from an API

import React, { useState } from "react";
import Services from "../Home/ServicesCards/Services";
import { Switch, FormControlLabel, Divider} from "@mui/material"; 
import Location from "../../../Location/Location"; 
import Pagination from "../../components/Pagination/Pagination"

const acServicesData = [
  { title: "AC Installation", image: "/images/ac-installation.jpg" },
  { title: "AC Repair", image: "/images/ac-repair.jpg" },
  { title: "AC Cleaning", image: "/images/ac-cleaning.jpg" },
];

const AcServices = () => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [services, setServices] = useState(acServicesData);
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
    let category = "ac-services"; // You can replace this with the actual category

    fetch(`/api/products/nearby?category=${category}&latitude=${latitude}&longitude=${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Sorted Services: ", data);
        displayServices(data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  };

  // Function to display fetched services
  const displayServices = (services: any[]) => {
    if (services.length === 0) {
      setServices([]); // Update services with an empty array if no services are found
    } else {
      setServices(services); // Update services with fetched data
    }
  };

  // Handle the location and status changes from the Location component
  const handleLocationChange = (latitude: number, longitude: number) => {
    fetchServicesByLocation(latitude, longitude);
  };

  return (
    <div>
      {/* Header with AC Services and Toggle Button */}
      <div className="grid grid-cols-3 items-center">
        {/* Empty div to balance the grid */}
        <div></div>

        {/* Centered "AC Services..." Text */}
        <h4 className="font-bold text-xl text-blue-900 text-center uppercase">AC Services...</h4>

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

      {/* Location Component */}
      <Location
        locationEnabled={locationEnabled}
        onLocationChange={handleLocationChange}
      />

      {/* Displaying the services list */}
      <div>
        <Services />
      </div>

      {/* //pagination */}

      <div className="flex justify-center pt-10">
      <Pagination
        page={page}
        onPageChange={handlePageChange}
        count={5}  // You can dynamically fetch total pages from the backend
      />
          </div>
    </div>
  );
};

export default AcServices;
