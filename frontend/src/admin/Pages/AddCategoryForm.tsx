import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, CircularProgress } from "@mui/material";
import { useAppDispatch } from "../../state/Store";
import { addCategory } from "../../state/customer/CategorySlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Category name must be at least 3 characters long")
    .required("Category name is required"),
});

const AddCategoryForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const categoryId = values.name.toLowerCase().replace(/\s+/g, "-"); // Convert to slug format
      try {
        await dispatch(addCategory({ name: values.name, categoryId })).unwrap();
        toast.success("Category added successfully! ✅");
        navigate("/admin/list-of-categories");
      } catch (error) {
        toast.error("Failed to add category. ❌");
      }
      setLoading(false);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Enter Category Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              sx={{ p: "14px" }}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress size="small" sx={{ width: "27px", height: "27px" }} /> : "Add Category"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCategoryForm;
