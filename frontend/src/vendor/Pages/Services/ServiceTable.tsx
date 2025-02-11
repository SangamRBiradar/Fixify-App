import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { fetchVendorServices } from "../../../state/vendor/VendorServiceSlice";
import { useSelector } from "react-redux";
import { Service } from "../../../types/ServiceType";
import { Button, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

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
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ServiceTable() {
  const dispatch = useAppDispatch();

  const { vendorService } = useAppSelector((store) => store);
  const services = vendorService?.services || [];

  React.useEffect(() => {
    dispatch(fetchVendorServices(localStorage.getItem("jwt")));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Service Image</StyledTableCell>
            <StyledTableCell>Service Name</StyledTableCell>
            <StyledTableCell>Service Charge</StyledTableCell>
            <StyledTableCell>visit Charge</StyledTableCell>
            <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {services.map((item: Service) => (
    <StyledTableRow key={item.id}>
      <StyledTableCell component="th" scope="row">
        <div className="flex gap-1 flex-wrap">
          {item.images?.map((image, index) => (
            <img key={index} className="w-20 rounded-md" alt="" src={image} />
          )) || "No Image"}
        </div>
      </StyledTableCell>
      <StyledTableCell>{item.title}</StyledTableCell>
      <StyledTableCell>{item.sellingPrice}</StyledTableCell>
      <StyledTableCell>{item.mrpPrice}</StyledTableCell>
      <StyledTableCell align="right">
        <IconButton size="small" color="primary">
          <Edit />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  ))}
</TableBody>

      </Table>
    </TableContainer>
  );
}
