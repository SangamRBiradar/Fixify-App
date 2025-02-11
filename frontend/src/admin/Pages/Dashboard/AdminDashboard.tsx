import React, { useEffect, useState } from 'react'
import AdminRoutes from "../../../Routes/AdminRoutes"
import AdminDrawerList from '../../Components/AdminDrawerList'
import { useAppDispatch } from '../../../state/Store';
import { fetchHomeCategories } from '../../../state/admin/AdminSlice';
import { fetchCategories } from '../../../state/customer/CategorySlice';

//import { Alert, Snackbar } from '@mui/material'
// import { useAppSelector } from '../../../Redux Toolkit/Store'

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  // const { deal,admin } = useAppSelector(store => store)

  // useEffect(() => {
  //   if (deal.dealCreated || deal.dealUpdated ||deal.error || admin.categoryUpdated) {
  //     setOpenSnackbar(true)
  //   }
  // }, [deal.dealCreated, deal.dealUpdated, deal.error,admin.categoryUpdated])

  // useEffect(() => {

  //   dispatch(fetchCategories());

  // }  , [])

  const toggleDrawer = () => { }

  return (
    <div className="min-h-screen">
    {/* <Navbar DrawerList={VendorDrawerList}/> */}
    <section className="lg:flex lg:h-[90vh]">
      <div className="hidden lg:block h-full">
        
      <AdminDrawerList toggleDrawer={toggleDrawer}/>
    
      </div>
      <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
        <AdminRoutes/>
      </div>
    </section>

  </div>  
  )
}
export default AdminDashboard