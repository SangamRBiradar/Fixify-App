import React, { useEffect, useState } from "react";
//import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  Snackbar,
} from "@mui/material";
import ProfileFildCard from "./ProfileFildCard";
import EditIcon from "@mui/icons-material/Edit";
import PersonalDetailsForm from "./PersonalDetailsForm";
import ShopAddressForm from "./ShopAddressForm";
import BankDetailsForm from "./BankDetailsForm";
import ShopDetailsForm from "./ShopDetailsForm";
import { useAppSelector } from "../../../state/Store";

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Profile = () => {
 // const { Vendors } = useAppSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const [selectedForm, setSelectedForm] = useState("PersonalDetails");
  const handleClose = () => setOpen(false);
  const [snackbarOpen, setOpenSnackbar] = useState(false);
  const {vendor} = useAppSelector(store=>store);

  const handleOpen = (formName: string) => {
    setOpen(true);
    setSelectedForm(formName);
  };

  const renderSelectedForm = () => {
    switch (selectedForm) {
      case "personalDetails":
        return <PersonalDetailsForm onClose={handleClose} />;
      case "ShopDetails":
        return <ShopDetailsForm onClose={handleClose} />;
      case "ShopAddress":
        return <ShopAddressForm onClose={handleClose} />;
      case "bankDetails":
        return <BankDetailsForm onClose={handleClose} />;
      default:
        return null;
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // useEffect(() => {
  //   if (Vendors.profileUpdated || Vendors.error) {
  //     setOpenSnackbar(true);
  //   }
  // }, [Vendors.profileUpdated]);

  return (
    <div className="lg:p-20 space-y-20">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Persional Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("personalDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          />
          <div>
            <ProfileFildCard
              keys={"Vendor Name"}
              value={vendor.profile?.vendorName}
              // value={Vendors.profile?.VendorName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Vendor Email"}
              value={vendor.profile?.email}
              // value={Vendors.profile?.email}
            />
            <Divider />
            <ProfileFildCard
              keys={"Vendor Mobile"}
              value={vendor.profile?.mobile}
              // value={Vendors.profile?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Shop Details
          </h1>
          <div>
            <Button
              onClick={() => handleOpen("ShopDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>

        <div className=" ">
          <ProfileFildCard
            keys={"Shop Name"}
            value={vendor.profile?.shopDetails.shopName}
            // value={Vendors.profile?.businessDetails?.businessName}
          />
          <Divider />
          <ProfileFildCard
            keys={"GSTIN"}
            value={"GS987594IN"}
            // value={Vendors.profile?.gstin || "not provided"}
          />
          <Divider />
          <ProfileFildCard
            keys={"Account Status"}
            value={vendor.profile?.accountStatus}
            // value={Vendors.profile?.accountStatus}
          />
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Shop Address</h1>
          <div>
            <Button
              onClick={() => handleOpen("ShopAddress")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFildCard
              keys={"Adress"}
              value={vendor.profile?.pickUpAddress.address}
              // value={Vendors.profile?.pickupAddress?.address}
            />
            <Divider />
            <ProfileFildCard
              keys={"City"}
              value={vendor.profile?.pickUpAddress.city}
              // value={Vendors.profile?.pickupAddress?.city || "not provided"}
            />
            <Divider />
            <ProfileFildCard
              keys={"State"}
              value={vendor.profile?.pickUpAddress.state}
              // value={Vendors.profile?.pickupAddress?.state}
            />
            <Divider />
            <ProfileFildCard
              keys={"Mobile"}
              value={vendor.profile?.pickUpAddress.mobile}
              // value={Vendors.profile?.pickupAddress?.mobile}
            />
          </div>
        </div>
      </div>
      <div className="mt-10 lg:w-[70%]">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">Bank Details</h1>
          <div>
            <Button
              onClick={() => handleOpen("bankDetails")}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="">
            <ProfileFildCard
              keys={"Account Holder Name"}
              value={vendor.profile?.bankDetails.accountHolderName}
              //value={Vendors.profile?.bankDetails?.accountHolderName}
            />
            <Divider />
            <ProfileFildCard
              keys={"Account Number"}
              value={vendor.profile?.bankDetails?.accountNumber || "not provided" }
              // value={Vendors.profile?.bankDetails?.accountNumber || "not provided"}
            />
            <Divider />
            <ProfileFildCard
              keys={"IFSC CODE"}
              value={vendor.profile?.bankDetails?.ifscCode || "not provided" }
              // value={Vendors.profile?.bankDetails?.ifscCode}
            />
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{renderSelectedForm()}</Box>
      </Modal>
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={Vendors.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {Vendors.error ? Vendors.error : "Profile Updated Successfully"}
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Profile;
