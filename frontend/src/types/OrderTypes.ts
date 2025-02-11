
import { Service } from './ServiceType';
import { Address, User } from './UserType';
import { Vendor } from './VendorTypes';

export interface OrderState {
    orders: Order[];
    orderItem:OrderItem | null;
    currentOrder: Order | null;
    paymentOrder: any | null;
    loading: boolean;
    error: string | null;
    orderCanceled: boolean
}

export interface Order {
    id: number;
    orderId: string;
    user: User;
    vendorId: number;
    orderItems: OrderItem[];
    orderDate: string; 
    shippingAddress: Address;
    paymentDetails: any;
    totalMrpPrice: number;
    totalSellingPrice?: number; // Optional field
    discount?: number; // Optional field
    orderStatus: OrderStatus;
    totalItem: number;
    delieverDate:string;
}

export enum OrderStatus {
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

export interface OrderItem {
    totalSellingPrice: number;
    id: number;
    order: Order;
    service: Service;
    size: string;
    quantity: number;
    mrpPrice: number;
    sellingPrice: number; 
    userId: number;
   
}
