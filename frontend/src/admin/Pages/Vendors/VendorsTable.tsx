import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  styled,
  TableFooter,
  TablePagination,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useAppSelector, useAppDispatch } from "../../../state/Store";
import {
  fetchVendors,
  updateVendorAccountStatus,
} from "../../../state/vendor/VendorSlice";
// import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
// import { fetchVendors, selectVendors, updateVendorAccountStatus } from '../../../Redux Toolkit/Vendor/VendorSlice';

const accountStatuses = [
  {
    status: "PENDING_VERIFICATION",
    title: "Pending Verification",
    description: "Account is created but not yet verified",
  },
  {
    status: "ACTIVE",
    title: "Active",
    description: "Account is active and in good standing",
  },
  {
    status: "SUSPENDED",
    title: "Suspended",
    description: "Account is temporarily suspended, possibly due to violations",
  },
  {
    status: "DEACTIVATED",
    title: "Deactivated",
    description:
      "Account is deactivated, user may have chosen to deactivate it",
  },
  {
    status: "BANNED",
    title: "Banned",
    description: "Account is permanently banned due to severe violations",
  },
  {
    status: "CLOSED",
    title: "Closed",
    description: "Account is permanently closed, possibly at user request",
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  gst: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, gst, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 1, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 2, 37, 4.3),
  createData("Eclair", 262, 16.0, 3, 24, 6.0),
  createData("Cupcake", 305, 3.7, 4, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 5, 49, 3.9),
];

export default function VendorsTable() {
  const [page, setPage] = React.useState(0);
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  const { vendor } = useAppSelector((store) => store);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchVendors(accountStatus));
  }, [accountStatus]);

  const handleAccountStatusChange = (event: any) => {
    setAccountStatus(event.target.value as string);
  };

  const handleUpdateVendorAccountStatus = (id: number, status: string) => {
    dispatch(updateVendorAccountStatus({ id, status }));
  };

  const [anchorEl, setAnchorEl] = React.useState<{
    [key: number]: HTMLElement | null;
  }>({});
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    vendorId: any
  ) => {
    setAnchorEl((prev) => ({ ...prev, [vendorId]: event.currentTarget }));
  };
  const handleClose = (vendorId: number) => {
    setAnchorEl((prev) => ({ ...prev, [vendorId]: null }));
  };

  return (
    <>
      <div className="pb-5 w-60">
        <FormControl color="primary" fullWidth>
          <Select
            //   labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={accountStatus}
            onChange={handleAccountStatusChange}
            color="primary"
            className="text-primary-color"
          >
            {accountStatuses.map((status) => (
              <MenuItem value={status.status}>{status.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Vendor Name</StyledTableCell>
              {/* <StyledTableCell >Category</StyledTableCell> */}
              <StyledTableCell align="right">Shop Name</StyledTableCell>
              <StyledTableCell align="right">GSTIN number</StyledTableCell>
              <StyledTableCell align="right">Account Status</StyledTableCell>
              <StyledTableCell align="right">Update</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendor.vendors?.map((vendor) => (
              <StyledTableRow key={vendor.name}>
                <StyledTableCell component="th" scope="row">
                  {vendor.vendorName}
                </StyledTableCell>
                <StyledTableCell>{vendor.shopDetails.shopName}</StyledTableCell>
                <StyledTableCell align="right">{vendor.gstin}</StyledTableCell>
                <StyledTableCell align="right">{vendor.accountStatus}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button
                    id={"basic-button" + vendor.id}
                    onClick={(e) => handleClick(e, vendor.id)}
                  >
                    Change Status
                  </Button>
                  <Menu
                    id={"basic-menus" + vendor.id}
                    anchorEl={anchorEl[vendor.id || 1]}
                    open={Boolean(anchorEl[vendor.id || 1])}
                    onClose={() => handleClose(vendor.id || 1)}
                  >
                    {accountStatuses.map((status) => (
                      <MenuItem
                        onClick={() =>
                          handleUpdateVendorAccountStatus(
                            vendor.id || 1,
                            status.status
                          )
                        }
                        value={status.status}
                      >
                        {status.title}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
