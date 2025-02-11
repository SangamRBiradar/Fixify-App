import {
    configureStore,
    combineReducers,
} from "@reduxjs/toolkit";

import { thunk } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import VendorSlice from "./vendor/VendorSlice";
import vendorServiceSlice from "./vendor/VendorServiceSlice";
import serviceSlice from "./customer/ServiceSlice";
import CategorySlice from "./customer/CategorySlice";
import AuthSlice from "./AuthSlice";
import CartSlice from "./customer/CartSlice";
import OrderSlice from "./customer/OrderSlice";
import VendorOrderSlice from "./vendor/VendorOrderSlice";
import TransactionSlice from "./vendor/TransactionSlice";
// import AuthSlice from "./AuthSlice";
//   import sellerAuthenticationSlice from "./Seller/sellerAuthenticationSlice";
//   import sellerProductSlice from "./Seller/sellerProductSlice";
//   import ProductSlice from "./Customer/ProductSlice";
//   import CartSlice from "./Customer/CartSlice";
//   import AuthSlice from "./Customer/AuthSlice";
//   import UserSlice from "./Customer/UserSlice";
//   import OrderSlice from "./Customer/OrderSlice";
//   import sellerOrderSlice from "./Seller/sellerOrderSlice";
//   import payoutSlice from "./Seller/payoutSlice";
//   import transactionSlice from "./Seller/transactionSlice";
//   import CouponSlice from "./Customer/CouponSlice";
//   import AdminCouponSlice from "./Admin/AdminCouponSlice";
//   import ReviewSlice from "./Customer/ReviewSlice";
//   import WishlistSlice from "./Customer/WishlistSlice";
//   import AiChatBotSlice from "./Customer/AiChatBotSlice";
//   import revenueChartSlice from "./Seller/revenueChartSlice";
//   import CustomerSlice from "./Customer/Customer/CustomerSlice";
//   import DealSlice from "./Admin/DealSlice";
//   import AdminSlice from "./Admin/AdminSlice";

const rootReducer = combineReducers({

    // customer
    auth: AuthSlice,

    // user: UserSlice,
    service: serviceSlice,
    cart: CartSlice,
    order: OrderSlice,
    // coupone: CouponSlice,
    // review: ReviewSlice,
    // wishlist: WishlistSlice,
    // aiChatBot: AiChatBotSlice,
    // homePage:CustomerSlice,
    categories: CategorySlice,

    // // seller
    vendor: VendorSlice,
    // sellerAuth: sellerAuthenticationSlice,
    vendorService: vendorServiceSlice,
    vendorOrder: VendorOrderSlice,
    // sellerOrder: sellerOrderSlice,
    // payouts: payoutSlice,
    transaction: TransactionSlice,
    // revenueChart: revenueChartSlice,

    // admin
    // adminCoupon:AdminCouponSlice,
    // adminDeals:DealSlice,
    // admin:AdminSlice,
    // deal:DealSlice



});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
