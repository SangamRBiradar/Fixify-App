import { Button, Divider, IconButton } from "@mui/material";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { CartItem } from "../../../types/CartTypes";
import { useAppDispatch } from "../../../state/Store";
import {
  deleteCartItem,
  updateCartItem,
} from "../../../state/customer/CartSlice";

const CartIitem = ({ item }: { item: CartItem }) => {
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = () => {
    dispatch(
      deleteCartItem({
        jwt: localStorage.getItem("jwt") || "",
        cartItemId: item.id,
      })
    );
  };

  const handleUpdateQuantity = (value: number) => () => {
    dispatch(
      updateCartItem({
        jwt: localStorage.getItem("jwt"),
        cartItemId: item.id,
        cartItem: { quantity: item.quantity + value },
      })
    );
  };
  return (
    <div className=" border rounded-md relative">
      <div className="p-5 flex gap-3">
        <div>
          <img
            className="w-[90px] rounded-md"
            //src="/banarasi-saree 1.jpg"
            // {item.product.images[0]}
            src={item.service.images?.[0]}
            alt=""
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-semibold text-lg">
            {item.service.vendor?.shopDetails.shopName}
          </h1>
          <p className="text-gray-600 font-medium text-sm">
            {item.service.title}
          </p>
          <p className="text-xs">
            <strong>{item.service.description}</strong>{" "}
          </p>
          <p className="text-sm text-black-500">
            <strong>Quantity : </strong> {item.quantity}
          </p>
        </div>
      </div>
      <Divider />
      <div className="px-5 py-2 flex justify-between items-center">
        <div className=" flex items-center gap-2  w-[140px] justify-between">
          <Button size="small" onClick={handleUpdateQuantity(-1)}>
            <RemoveIcon />
          </Button>
          <span className="px-3  font-semibold">{item.quantity}</span>
          <Button size="small" onClick={handleUpdateQuantity(1)}>
            <AddIcon />
          </Button>
        </div>
        <div>
          <p className="text-gray-700 font-medium">₹{item.sellingPrice}</p>
          {/*item.sellingPrice*/}
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <IconButton onClick={handleRemoveCartItem} color="primary">
          <CloseIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartIitem;
