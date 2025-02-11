import React from "react";
import { Pagination } from "@mui/material";

interface PaginationProps {
  page: number;
  onPageChange: (value: number) => void;
  count: number; // Total number of pages
}

const PaginationComponent: React.FC<PaginationProps> = ({ page, onPageChange, count }) => {
  return (
    <div className="flex justify-center pt-10">
      <Pagination
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        count={count} // This will be dynamically set
        shape="rounded"
      />
    </div>
  );
};

export default PaginationComponent;
