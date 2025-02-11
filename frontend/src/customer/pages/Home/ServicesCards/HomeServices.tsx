import React, { useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { useAppDispatch, useAppSelector } from "../../../../state/Store";
import { fetchHomeServices } from "../../../../state/customer/ServiceSlice";

const Services: React.FC = () => {
  const dispatch = useAppDispatch();

  // Extract services state from Redux store
  const { services = [], loading, error } = useAppSelector((state) => state.service) || {};

  useEffect(() => {
    dispatch(fetchHomeServices()); // Fetch all services on initial render
  }, [dispatch]); // Runs only once when component mounts

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>Error fetching services: {error}</p>;

  return (
    <section className="py-5 lg:px-20">
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 justify-items-center">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              id={service.id}
              title={service.title} 
              price={service.sellingPrice}
              image={service.images?.[0] || "/default-image.jpg"} 
            />
          ))}
        </div>
      ) : (
        <p>No services available.</p>
      )}
    </section>
  );
};

export default Services;
