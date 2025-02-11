import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from '../admin/Pages/Dashboard/AdminDashboard'
import CustomersTable from '../admin/Pages/Customers/CustomersTable'
import AddCategoryForm from '../admin/Pages/AddCategoryForm'
import AdminProfile from '../admin/Pages/AdminProfile'
import VendorsTable from '../admin/Pages/Vendors/VendorsTable'
import CategoryTable from '../admin/Pages/CategoryTable'

const AdminRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path='/' element={<VendorsTable />} />
        <Route path='/list-of-customers' element={<CustomersTable />} />
        <Route path='/add-category' element={<AddCategoryForm/>} />
        <Route path='/account' element={<AdminProfile />} />
        <Route path='/list-of-categories' element={<CategoryTable/>} />
        </Routes>
    </div>
  )
}

export default AdminRoutes