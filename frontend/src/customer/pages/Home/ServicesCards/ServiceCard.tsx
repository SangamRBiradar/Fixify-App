import { CurrencyRupee } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id?: number;
  title: string;
  image: string;
  price?: number;
  shopName?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, title, image, price, shopName}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${id}`); // Navigate to the service detail page
  };

  return (
    <div 
      className="w-[25rem] cursor-pointer transition-transform hover:scale-105 hover:shadow-xl hover:border-blue-800 border-4 border-black rounded-lg overflow-hidden"
      onClick={handleClick}
    >
      <img
        className="w-full h-[15rem] object-cover object-top border-x-[7px] border-y-[7px] border-blue-600"
        src={image}
        alt={title}
      />
      <div className="border-4 border-black bg-black text-white p-2">
        <p className="text-lg font-bold text-center">{title}</p>
        <p className="text-lg text-center flex justify-center items-center">
          {shopName}
        </p>
        <p className="text-lg text-center flex justify-center items-center">
          <CurrencyRupee /> {price}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
