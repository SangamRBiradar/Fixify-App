import { Order } from "./OrderTypes";
import { User } from "./UserType";
import { Vendor } from "./VendorTypes";

export interface Transaction {
    id: number;
    customer: User;
    order: Order;
    seller: Vendor;
    date: string;
  }