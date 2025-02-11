import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { fetchServiceById } from "../../../state/customer/ServiceSlice";
import StarIcon from "@mui/icons-material/Star";
import ShieldIcon from "@mui/icons-material/Shield";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { blue } from "@mui/material/colors";
import { Divider, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addItemToCart } from "../../../state/customer/CartSlice";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const dispatch = useAppDispatch();
  const { service, loading, error } = useAppSelector((state) => state.service);
  const [quantity, setQuantity] = useState(1); // Quantity state
    const [activeImage, setActiveImage] = useState(0);
  useEffect(() => {
    if (serviceId) {
      const numericServiceId = Number(serviceId);
      if (!isNaN(numericServiceId)) {
        dispatch(fetchServiceById(numericServiceId));
      }
    }
    
  }, [dispatch, serviceId]);

  useEffect(() => {
    console.log("Fetched Service:", service);
}, [service]);

  // Handle Quantity Change
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (loading) return <p>Loading service details...</p>;
  if (error) return <p>Error fetching service details: {error}</p>;

  const handleActiveImage = (index: number) =>()=> {
    setActiveImage(index);
  }

  const handleAddCart = () => {
    dispatch(addItemToCart({
        jwt: localStorage.getItem('jwt'),
        request: { serviceId: Number(serviceId), size: "FREE", quantity }

    }))
  }

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Service Image Section */}
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[90%]">
          {  service?.images?.map((item,index) => (
              <img
                className="w-full rounded-md cursor-pointer"
                src={item.trim() || "/default-image.jpg"}
                alt={service?.title || "Service Image"}
                onClick={handleActiveImage(index)}
              />
            ))}
            {/* <img
              className="w-full rounded-md"
              src={service?.images?.[0]?.trim() || "/default-image.jpg"}
              alt={service?.title || "Service Image"}
            /> */}
          </div>
        </section>

        {/* Service Details Section */}
        <section>
          <h1 className="font-bold text-lg text-primary-color">
            {service?.vendor?.shopDetails?.shopName || "Unknown Shop"}
          </h1>
          <p className="text-gray-500 font-semibold">{service?.title || "No Title Available"}</p>

          {/* Ratings Section */}
          <div className="flex justify-between items-center py-2 border w-[180px] px-3 pt-5">
            <div className="flex gap-1 items-center">
              <span>{service?.numRatings ?? "No Ratings"}</span>
              <StarIcon sx={{ color: blue[900], fontSize: "17px" }} />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>{10} Ratings</span>
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <div className="price flex items-center gap-3 mt-5 text-lg">
              <span className="font-semibold text-gray-800"> ₹{service?.sellingPrice ?? "N/A"} </span>
              {service?.sellingPrice && (
                <>
                  <span className="text-gray-400 line-through"> ₹{service?.mrpPrice} </span>
                  <span className="text-primary font-semibold">
                    {service?.discount || "0%"} off
                  </span>
                </>
              )}
            </div>
            <p className="text-sm">{service?.description || "No description available."}</p>
          </div>

          {/* Service Features Section */}
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-4">
              <ShieldIcon sx={{ color: blue[900] }} />
              <p>Security & Quality Assured</p>
            </div>
            <div className="flex items-center gap-4">
              <LocalShippingIcon sx={{ color: blue[900] }} />
              <p>Home Visit Services</p>
            </div>
          </div>

          {/* Quantity Selection */}
          {/* <div className="mt-7 space-y-2">
            <h1>QUANTITY:</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button onClick={handleDecrease} disabled={quantity === 1} variant="outlined">
                <RemoveIcon />
              </Button>
              <span className="px-3 text-lg font-semibold">{quantity}</span>
              <Button onClick={handleIncrease} variant="outlined">
                <AddIcon />
              </Button>
            </div>
          </div> */}

<div className='mt-7 space-y-2'>
                        <h1>QUANTITY:</h1>
                        <div className=' flex items-center gap-2  w-[140px] justify-between'>

                            <Button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)} variant='outlined'>
                                <RemoveIcon />
                            </Button>
                            <span className='px-3 text-lg font-semibold'>
                                {quantity}
                            </span>
                            <Button onClick={() => setQuantity(quantity + 1)} variant='outlined'>
                                <AddIcon />
                            </Button>

                        </div>
                    </div>


          {/* Add to Cart Button */}
          <div className="mt-12 flex items-center gap-5">
            <Button onClick={handleAddCart} variant="contained" fullWidth startIcon={<AddShoppingCartIcon />}>
              Add To Cart
            </Button>
          </div>

          {/* Description */}
          <div className="mt-5">
            <p>{service?.description || "Detailed service description goes here."}</p>
            <br />
            <Divider />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServiceDetail;
