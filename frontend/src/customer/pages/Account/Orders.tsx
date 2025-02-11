import React, { useEffect } from "react";
import OrderItemCart from "./OrderItemCart";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { fetchUserOrderHistory } from "../../../state/customer/OrderSlice";

const Orders = () => {
  const dispatch = useAppDispatch();
const { order } = useAppSelector(store => store);
  useEffect(() => {
    dispatch(fetchUserOrderHistory(localStorage.getItem("jwt") || ""));
  }, []);

  return (
    <div className="text-sm min-h-screen px-4 max-w-5xl mx-auto">
      <div className="pb-5">
        <h1 className="font-semibold">All orders</h1>
        <p>from anytime</p>
      </div>
      <div className="space-y-2  w-full">

        {order.orders.map((order) => order.orderItems.map((item)=><OrderItemCart order={order} item={item} />))}
        
        {/* {order?.orders?.map((order)=>order?.orderItems.map((item)=><OrderItemCart item={item} order={order}/>))} */}
        {/* {[1, 1, 1, 1].map((item) => (
          <OrderItemCart />
        ))} */}
      </div>
    </div>
  );
};

export default Orders;
