import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../customer/pages/Home/Home'
import Services from '../vendor/Pages/Services/Services'
import Orders from '../vendor/Pages/Orders/Orders'
import Payment from '../vendor/Pages/Payment/Payment'
import Dashboard from '../vendor/Pages/VendorDashboard/Dashboard'
import Profile from '../vendor/Pages/Account/Profile'
import Transaction from '../vendor/Pages/Payment/TransactionTable'
import AddService from '../vendor/Pages/Services/AddService'

const VendorRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/services' element={<Services />} />
        <Route path='/add-service' element={<AddService/>} />
        {/* <Route path='/update-service/:serviceId' element={<UpdateProductForm />} /> */}
        <Route path='/orders' element={<Orders />} />
        <Route path='/account' element={<Profile />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/transaction' element={<Transaction/>} />
        
        </Routes>
    </div>
  )
}

export default VendorRoutes