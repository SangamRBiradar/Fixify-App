import * as React from "react";

import MailIcon from "@mui/icons-material/Mail";

import { AccountBox } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from '@mui/icons-material/Add';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import DrawerList from "../../../Components/DrawerList";
const menu = [
  {
    name: "Dashboard",
    path: "/vendor",
    icon: <DashboardIcon className="text-primary-color" />,
    activeIcon: <DashboardIcon className="text-white" />,
  },
  {
    name: "Orders",
    path: "/vendor/orders",
    icon: <ShoppingBagIcon className="text-primary-color" />,
    activeIcon: <ShoppingBagIcon className="text-white" />,
  },
  {
    name: "Services",
    path: "/vendor/services",
    icon: <InventoryIcon className="text-primary-color" />,
    activeIcon: <InventoryIcon className="text-white" />,
  },
  {
    name: "Add Service",
    path: "/vendor/add-service",
    icon: <AddIcon className="text-primary-color" />,
    activeIcon: <AddIcon className="text-white" />,
  },
  {
    name: "Payment",
    path: "/vendor/payment",
    icon: <AccountBalanceWalletIcon className="text-primary-color" />,
    activeIcon: <AccountBalanceWalletIcon className="text-white" />,
  },
  {
    name: "Transaction",
    path: "/vendor/transaction",
    icon: <ReceiptIcon className="text-primary-color" />,
    activeIcon: <ReceiptIcon className="text-white" />,
  },
  // {
  //   name: "Inventory",
  //   path: "/seller/inventory",
  //   icon: <MailIcon className="text-primary-color" />,
  //   activeIcon: <MailIcon className="text-white" />,
  // },
];

const menu2 = [
  
  {
    name: "Account",
    path: "/vendor/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <LogoutIcon className="text-primary-color" />,
    activeIcon: <LogoutIcon className="text-white" />,
  },
];

// interface DrawerListProps {
//   toggleDrawer?: any;
// }

const VendorDrawerList = ({ toggleDrawer }: {toggleDrawer:any}) => {
  return (
 
   <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
  
  )
};

export default VendorDrawerList;
