import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchCategories } from '../../state/customer/CategorySlice';
import { useAppDispatch, useAppSelector } from '../../state/Store';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(
//   id :number,
//   name: string,
 
// ) {
//   return {id, name};
// }

// const rows = [
//   createData(1,'Frozen yoghurt'),
//   createData(2,'Ice cream sandwich'),
  
// ];

 

export default function CategoryList() {
  const dispatch = useAppDispatch();
  const {categories} = useAppSelector(store => store);
 
 React.useEffect(() => {
 
     dispatch(fetchCategories());
 
   }  , [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category Id</StyledTableCell>
            <StyledTableCell >Category Name</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.categories.map((item:any) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
                {item.id}
              </StyledTableCell>
              <StyledTableCell >{item.name}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
