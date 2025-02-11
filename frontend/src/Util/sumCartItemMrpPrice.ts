import { CartItem } from "../types/CartTypes";

export const sumCartItemMrpPrice = (cartItems: CartItem[]) => {
    console.log("Cart Items:", cartItems);
    return cartItems.reduce((acc: number, item: CartItem) => {
    //   console.log(`Item: ${item.name}, MRP: ${item.mrpPrice}, Quantity: ${item.quantity}`);
      return  item.mrpPrice ;
    }, 0);
  };
  
  export const sumCartItemSellingPrice = (cartItems: CartItem[]) => {
    console.log("Cart Items:", cartItems);
    return cartItems.reduce((acc: number, item: CartItem) => {
    //   console.log(`Item: ${item.name}, Selling Price: ${item.sellingPrice}, Quantity: ${item.quantity}`);
      return acc+  item.sellingPrice ;
    }, 0);
  };
  