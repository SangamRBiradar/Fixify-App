import { Service } from "./ServiceType";
import { User } from "./UserType";

export interface CartItem {
    id: number;
    cart?: Cart;
    service: Service;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number;
    userId: number;
}


export interface Cart {
    id: number;
    user: User;
    cartItems: CartItem[];
    totalSellingPrice: number;
    totalItem: number;
    totalMrpPrice: number;
    discount: number;
    couponCode: string | null;
  }
