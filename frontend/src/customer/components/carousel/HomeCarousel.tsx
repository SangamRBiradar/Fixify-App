import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const serviceImages = [
  "https://5.imimg.com/data5/SELLER/Default/2022/11/WJ/HF/YT/148935726/home-appliance-repair-service.jpg",
  "https://5.imimg.com/data5/SELLER/Default/2023/8/338627025/VL/OW/KO/6773149/home-appliances-repairing-service.jpg",
  "https://stl.tech/wp-content/uploads/2023/02/Network-services-scaled.webp"
  // Carpentry
];



const HomeCarousel = () => {
  const items = serviceImages.map((image, index) => (
    <img
      key={index}
      src={image}
      alt={`Service ${index + 1}`}
      className="w-full h-[85vh] object-cover rounded-lg shadow-xl"
    />
  ));

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      autoPlayInterval={2000}
      infinite
      disableButtonsControls
      animationDuration={1000}
    />
  );
};

export default HomeCarousel;
