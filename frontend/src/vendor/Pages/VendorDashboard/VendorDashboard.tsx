import React from 'react'
import VendorDrawerList from '../../Components/SideBar/VendorDrawerList'
import VendorRoutes from '../../../Routes/VendorRoutes'


const VendorDashboard = () => {
    const toggleDrawer=()=>{}
  return (
    <div className="min-h-screen">
      {/* <Navbar DrawerList={VendorDrawerList}/> */}
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full">
        <VendorDrawerList toggleDrawer={toggleDrawer}/>
      
        </div>
        <div className="p-10 w-full lg:w-[80%]  overflow-y-auto">
          <VendorRoutes/>
        </div>
      </section>
    </div>
  )
}

export default VendorDashboard

