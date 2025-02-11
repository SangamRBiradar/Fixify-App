import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "../../../state/Store"; // Adjust path if needed
import { fetchCategories } from "../../../state/customer/CategorySlice"; // Adjust path if needed
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Define the interface for Category
interface Category {
  id: number;
  categoryId: string;
  name: string;
}

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {auth} = useAppSelector((store) => store);

  // Fetch categories from Redux store
  const { categories, status, error } = useSelector((state: RootState) => state.categories || { categories: [], status: "idle", error: null });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Menu handlers
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
        {/* Left Section */}
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton>
                <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}
            <h1 onClick={() => navigate("/")} className="logo cursor-pointer text-lg md:text-2xl text-[#222794]">
              FixiFy
            </h1>
          </div>

          {/* Navigation Buttons */}
          {isLarge && (
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate("/")} color="primary">
                Home
              </Button>
              
              <Button onClick={handleMenuClick} color="primary">
                Categories
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {status === "loading" ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : error ? (
                  <MenuItem disabled>Error loading categories</MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      onClick={() => {
                        handleMenuClose();
                        navigate(`/categories/${category.categoryId}`);
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Menu>
              <Button onClick={() => navigate("/about")} color="primary">
                About Us
              </Button>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex gap-1 lg:gap-6 items-center">
          <IconButton onClick={() => navigate("/search-products")}>
            <SearchIcon className="text-gray-700" sx={{ fontSize: 29 }} />
          </IconButton>

          {/* User Profile */}
          {auth.user ? (
            <Button onClick={() => navigate("/account/orders")} className="flex items-center gap-2">
              <Avatar sx={{ width: 29, height: 29 }} src="https://cdn.pixabay.com/photo/2015/04/15/09/28/head-723540_640.jpg" />
              <h1 className="font-semibold hidden lg:block">{auth.user?.fullName}</h1>
            </Button>
          ) : (
            <Button variant="contained" startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />} onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          {/* Cart Icon */}
          <IconButton onClick={() => navigate("/cart")}>
            <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          {/* Become Vendor Button */}
          {isLarge && (
            <Button onClick={() => navigate("/become-vendor")} startIcon={<StorefrontIcon />} variant="outlined">
              Become Vendor
            </Button>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
