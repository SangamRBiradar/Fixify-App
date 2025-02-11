import React from "react";
import HomeCarousel from "../../components/carousel/HomeCarousel";
import Services from "./ServicesCards/Services";
import HomeServices from "./ServicesCards/HomeServices";
import Footer from "../../../Components/Footer";

const popularServicesData = [
  { title: "AC Repair", image: "/images/ac-repair.jpg" },
  { title: "TV Installation", image: "/images/tv-installation.jpg" },
  { title: "Electrical Wiring", image: "/images/electrical-wiring.jpg" },
  { title: "Fridge Repair", image: "/images/fridge-repair.jpg" },
  { title: "Washing Machine Repair", image: "/images/washing-machine.jpg" },
];

const Home = () => {
  return (
    <div>
      <HomeCarousel />
      <div className="text-center">
        <p className="font-bold text-xl text-blue-900">Popular Services...</p>
      </div>
      <div>
        <HomeServices />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
