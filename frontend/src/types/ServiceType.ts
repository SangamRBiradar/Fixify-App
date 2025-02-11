import { Review, Vendor } from "./VendorTypes";

export interface Service{
    id?:number;
    title:string;
    description:string,
    mrpPrice:number,
    sellingPrice:number,
    images?:string[],
    numRatings?:number,
    category?:Category,
    quantity:number;
    vendor?:Vendor;
    shopName:string;
    // reviews?:Review[];
    createdAt?:Date;
    discount:number;
    ratingsCount:number;
}

export interface Category{

    id?:number;
    name:string;
    categoryId?:string;


}