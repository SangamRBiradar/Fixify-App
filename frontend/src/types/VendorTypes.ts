
export interface PickupAddress {
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export interface BankDetails {
    accountNumber: string;
    ifscCode: string;
    accountHolderName: string;
}

export interface ShopDetails {
    shopName: string;
    shopEmail: string;
    shopMobile: string;
    shopAddress: string;
    longitude: number;
    latitude: number;
  }
  

export interface Vendor {
    id?:number;
    mobile: string;
    otp: string;
    gstin: string;
    pickupAddress: PickupAddress;
    bankDetails: BankDetails;
    vendorName: string;
    email: string;
    shopDetails: ShopDetails;
    password: string;
    accountStatus?:string;
    review:Review;
}

export interface Review {

    id?:number;
    rating:number;
    comment:string;
    // user:User;
    // service:Service;
    createdAt:Date;
}

export interface VendorReport {
    id: number;
    vendor: Vendor;
    totalEarnings: number;
    totalSales: number;
    totalRefunds: number;
    totalTax: number;
    netEarnings: number;
    totalOrders: number;
    canceledOrders: number;
    totalTransactions: number;
  }
  