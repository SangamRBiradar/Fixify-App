import React, { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { useAppDispatch, useAppSelector } from "../../../../state/Store";
import { fetchAllServices, fetchNearbyServices } from "../../../../state/customer/ServiceSlice";
import { useParams } from "react-router-dom";
import { Switch, FormControlLabel, Divider } from "@mui/material";
import Location from "../../../../Location/Location";
import Footer from "../../../../Components/Footer";

const Services: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId } = useParams(); // Get category ID from URL

  const { services, loading, error, nearbyServices } = useAppSelector((state) => state.service);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [page] = useState(1); // Track pagination (if needed)

  useEffect(() => {
    if (categoryId && !locationEnabled) {
      dispatch(fetchAllServices(categoryId)); // Fetch default services when categoryId changes
    }
  }, [dispatch, categoryId, locationEnabled]);

  // Toggle location state
  const handleLocationToggle = () => {
    setLocationEnabled((prev) => !prev);
  };

  // Handle location updates from Location component
  const handleLocationChange = (latitude: number, longitude: number) => {
    if (locationEnabled && categoryId) {
      dispatch(fetchNearbyServices({ category: categoryId, latitude, longitude }));
    }
  };

  return (

    <div>
    <section className="py-5 lg:px-20">
      {/* Header Section */}
      <div className="grid grid-cols-3 items-center">
        <div></div>
        <h4 className="font-bold text-xl text-blue-900 text-center uppercase">Services</h4>
        <div className="flex justify-end">
          <FormControlLabel
            control={
              <Switch
                checked={locationEnabled}
                onChange={handleLocationToggle}
                color="primary"
              />
            }
            label="Get Nearby Services"
            labelPlacement="start"
          />
        </div>
        
      </div>
      

      <Divider />
      
      {/* Location Component */}
      {locationEnabled && <Location locationEnabled={locationEnabled} onLocationChange={handleLocationChange} />}

      {/* Display Services */}
      {loading && <p>Loading services...</p>}
      {error && <p>Error fetching services: {error}</p>}
      {!loading && !error && (locationEnabled ? nearbyServices : services)?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {(locationEnabled ? nearbyServices : services).map((service, index) => (
            <ServiceCard key={index} id={service.id} title={service.title} shopName={service?.vendor?.shopDetails?.shopName } price={service.mrpPrice} image={service.images?.[0] || "/default-image.jpg"} />
          ))}
        </div>
      ) : (
        <p>No services available.</p>
      )}
    </section>
    <div>
      <Footer></Footer>
    </div>
    </div>
    
    
  );
};

export default Services;
