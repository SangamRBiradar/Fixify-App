import * as React from "react";

import DrawerList from "../../Components/DrawerList"
import DashboardIcon from '@mui/icons-material/Dashboard';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Category } from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
const menu = [
    {
        name: "Dashboard",
        path: "/admin",
        icon: <DashboardIcon className="text-primary-color" />,
        activeIcon: <DashboardIcon className="text-white" />,
    },
    
    {
        name: "Customers",
        path: "/admin/list-of-customers",
        icon: <Category className="text-primary-color" />,
        activeIcon: <Category className="text-white" />,
    },
    {
        name: "Categories",
        path: "/admin/list-of-categories",
        icon: <Category className="text-primary-color" />,
        activeIcon: <Category className="text-white" />,
    },
    {
        name: "Add Category",
        path: "/admin/add-category",
        icon: <AddIcon className="text-primary-color" />,
        activeIcon: <AddIcon className="text-white" />,
    },
   
];

const menu2 = [

    {
        name: "Account",
        path: "/admin/account",
        icon: <AccountBoxIcon className="text-primary-color" />,
        activeIcon: <AccountBoxIcon className="text-white" />,
    },
    {
        name: "Logout",
        path: "/",
        icon: <LogoutIcon className="text-primary-color" />,
        activeIcon: <LogoutIcon className="text-white" />,
    },

]

// interface DrawerListProps{
//     toggleDrawer?:any;
// }

const AdminDrawerList = ({ toggleDrawer }: {toggleDrawer:any})  => {

    return (
        
        <DrawerList toggleDrawer={toggleDrawer} menu={menu} menu2={menu2}/>
        
    );
}; 

export default AdminDrawerList;
