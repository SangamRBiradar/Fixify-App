import { Divider } from '@mui/material'
import React from 'react'
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Orders from './Orders';
import OrderDetails from './OrderDetails';
import UserDetails from './UserDetails';
import Address from './Address';
import { useAppDispatch } from '../../../state/Store';
import { logout } from '../../../state/AuthSlice';

const menu = [
    { name: "orders", path: "/account/orders" },
    { name: "profile", path: "/account/profile" },
    { name: "Addresses", path: "/account/addresses" },
    { name: "Logout", path: "/" }
]

const Account = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch()
    const handleClick = (item: any) =>{
        if(item.path === "/") 
            dispatch(logout(navigate));
        else 
            navigate(item.path)
    } 
    // const dispatch = useAppDispatch()
    // const { user,orders } = useAppSelector(store => store)
    // const [snackbarOpen, setOpenSnackbar] = useState(false);

    // const handleLogout = () => {
    //     dispatch(performLogout())
    //     navigate("/")
    // }

    // const handleClick = (item: any) => {
    //     if (item.name === "Logout") {
    //         handleLogout()
    //     }
    //     else navigate(`${item.path}`)
    // }
    // const handleCloseSnackbar = () => {
    //     setOpenSnackbar(false);
    // };

    // useEffect(() => {
    //     if (user.profileUpdated || orders.orderCanceled || user.error) {
    //         setOpenSnackbar(true);
    //     }
    // }, [user.profileUpdated,orders.orderCanceled]);

    

    return (
        <div className='px-5 lg:px-52 min-h-screen mt-10 '>
            <div>
                <h1 className='text-xl font-bold pb-5'>{/*user.user?.fullName*/}Prathmesh</h1>
            </div>
            <Divider />
            <div className='grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]'>

                <section className="col-span-1 lg:border-r lg:pr-5 py-5 h-full  flex flex-row flex-wrap lg:flex-col gap-3">

                    {
                        menu.map((item) => (
                            <div onClick={() => handleClick(item)} key={item.name}
                                className={`${item.path === location.pathname ? "bg-primary-color text-white" : ""} px-5 py-3 rounded-md hover:bg-blue-900 hover:text-white cursor-pointer`}>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }

                </section>
                <section className="col-span-2">
                  {/* nested routing is being used here */}

                    <Routes>
                        <Route path='/' element={<UserDetails/>}/>
                        <Route path='/orders' element={<Orders />} />
                        <Route path='/orders/:orderId/:orderItemId' element={<OrderDetails />} />
                        <Route path='/profile' element={<UserDetails />} />
                        <Route path='/addresses' element={<Address />} />

                    </Routes>

                </section>
            </div>
        </div>
    )
}

export default Account

{/* //dynamic */}
                    {/* {menu.map((item, index) => <div
                        onClick={() => handleClick(item)}
                        className={`${menu.length - 1 !== index ? "border-b" : ""} ${item.path == location.pathname ? "bg-primary-color text-white" : ""} px-5 py-3 rounded-md hover:bg-teal-500 hover:text-white cursor-pointer `}>
                        <p>{item.name}</p>
                    </div>)} */}