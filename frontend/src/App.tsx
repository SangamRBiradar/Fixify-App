import './App.css';
import { ThemeProvider } from '@emotion/react';
import customeTheme from './Theme/customeTheme';
import { Button } from '@mui/material';

import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './customer/components/Navbar/Navbar';
import AboutUs from './customer/pages/About/AboutUs';
import Home from './customer/pages/Home/Home';
// import AcServices from './customer/pages/ServicePages/AcServices';
// import TvServices from './customer/pages/ServicePages/TvServices';
import ElectricalServices from './customer/pages/ServicePages/ElectricalServices';
import HomeAppliancesServices from './customer/pages/ServicePages/HomeAppliancesServices';
import ServiceDetail from './customer/pages/ServiceDetails/ServiceDetail';
import Review from './customer/pages/Review/Review';
import Cart from './customer/pages/Cart/Cart';
import Checkout from './customer/pages/Checkout/Checkout';
import Account from './customer/pages/Account/Account';
import BecomeVendor from './customer/pages/BecomeVendor/BecomeVendor';
import VendorDashboard from './vendor/Pages/VendorDashboard/VendorDashboard';
import AdminDashboard from './admin/Pages/Dashboard/AdminDashboard';
import { useEffect } from 'react';
import { fetchService } from './state/fetchService';
import { useAppDispatch, useAppSelector } from './state/Store';
import { fetchVendorProfile } from './state/vendor/VendorSlice';
import Services from './customer/pages/Home/ServicesCards/Services';
import Auth from './customer/pages/Auth/Auth';
import { fetchUserProfile } from './state/AuthSlice';
import PaymentSuccess from './customer/pages/PaymentSuccess';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRole } from './types/UserType';
import AdminNavbar from './admin/Components/AdminNavbar/AdminNavbar';


function App() {
  const dispatch = useAppDispatch();
  const {vendor,auth} = useAppSelector((store) => store);
  const navigate = useNavigate();

  


  // useEffect(() => {
  //   dispatch(fetchVendorProfile(localStorage.getItem('jwt') || ''));
  //   // fetchService();
  // },[]);

  // useEffect(() => {
  //   if(vendor.profile){
      
  //       navigate('/vendor');
      
  //   }
  // },[vendor.profile]);

  useEffect(() => {
    dispatch(fetchUserProfile({jwt:auth.jwt || localStorage.getItem('jwt')} ));
    // fetchService();
  },[auth.jwt]);

  const renderNavbar = () => {
    switch (auth.user?.role) {
      case UserRole.ROLE_ADMIN:
        return <AdminNavbar />;
      case UserRole.ROLE_VENDOR:
        return <AdminNavbar />;
      case UserRole.ROLE_CUSTOMER:
      default:
        return <Navbar />;
    }
  };



  return (
    <ThemeProvider theme={customeTheme}>
      <div className='App' >
      {renderNavbar()}
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={< AboutUs />} />
          <Route path="/categories/:categoryId" element={<Services />} />
          {/* <Route path="/categories/tv-services" element={<TvServices />} /> */}
          {/* <Route path="/categories/electrical-services" element={<ElectricalServices />} /> */}
          {/* <Route path="/categories/home-appliances" element={<HomeAppliancesServices />} /> */}
          <Route path="/reviews/:serviceId" element={<Review />} />
          {/* <Route path="/service_details/:categoryId/:name/:serviceId" element={<ServiceDetail/>} /> */}
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSuccess />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-vendor" element={<BecomeVendor />} />
          <Route path="/vendor/*" element={<VendorDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<Auth />} />

        </Routes>
        
       
        {/* <Account/> */}

      </div>



    </ThemeProvider>
  );
}

export default App;
