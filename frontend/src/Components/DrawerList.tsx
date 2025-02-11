import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/Store";
import { logout } from "../state/AuthSlice";
// import { useAppDispatch } from "../../../Redux Toolkit/Store";
// import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

interface MenuItem{
    name: string;
    path: string;
    icon: any;
    // React.ReactElement<any>
    activeIcon: any;
    //React.ReactElement<any>
}

interface DrawerListProps{
    menu:MenuItem[];
    menu2:MenuItem[];
    toggleDrawer:()=>void
}

const DrawerList = ({ toggleDrawer,menu,menu2 }: DrawerListProps) => {

    const dispatch = useAppDispatch()


    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        // dispatch(performLogout(navigate));
        dispatch(logout(navigate));

    }

    // const handleClick = (item: any)=>() => {

    //     if (item.name === "Logout") {
    //         handleLogout()

    //     }
    //     navigate(item.path);
    //     if(toggleDrawer) toggleDrawer(false)();
     
    return (
        <div className="h-full">
            <div
                className="flex flex-col  justify-between  h-full w-[300px] border-r py-5"
                
            >
                <div>
                    <div className="space-y-2">
                        {menu.map((item, index:number) => (
                            <div key={index}
                                onClick={()=>navigate(item.path)}
                                // onClick={handleClick(item)}
                                 className="pr-9 cursor-pointer"
                                >
                                <p
                                 className={`${item.path === location.pathname ? "bg-primary-color text-white " : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full hover:bg-blue-900 hover:text-white`}
                                 >
                                    <ListItemIcon>{location.pathname === item.path ? item.activeIcon : item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </p>
                            </div>
                        ))}
                    </div>
                        <Divider />
                    <div className="space-y-2">
                        {menu2.map((item, index:number) => (
                            <div key={index}
                                onClick={()=>{
                                    navigate(item.path)
                                    if(item.path === "/"){
                                        handleLogout();
                                    }
                                }}
                                // onClick={()=>navigate(item.path)}
                                // onClick={handleClick(item)}
                                 className="pr-9 cursor-pointer"
                                >
                                <p
                                 className={`${item.path === location.pathname ? "bg-primary-color text-white " : "text-primary-color"} flex items-center px-5 py-3 rounded-r-full hover:bg-blue-900 hover:text-white`}
                                 >
                                    <ListItemIcon>{location.pathname === item.path ? item.activeIcon : item.icon}</ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default DrawerList;


