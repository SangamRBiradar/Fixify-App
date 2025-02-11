import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { useFormik } from "formik";
import * as Yup from "yup";
import { 
  TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, 
  Grid, CircularProgress, IconButton, Snackbar, Alert 
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../../../Util/UploadToCloudinary";
import { createService } from "../../../state/vendor/VendorServiceSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../state/Store";
import { fetchCategories } from "../../../state/customer/CategorySlice";

const validationSchema = Yup.object({
  title: Yup.string().min(5, "Title should be at least 5 characters long").required("Title is required"),
  description: Yup.string().min(10, "Description should be at least 10 characters long").required("Description is required"),
  mrpPrice: Yup.number().positive("Price should be greater than zero").required("Price is required"),
  sellingPrice: Yup.number().positive("Selling price should be greater than zero").required("Selling price is required"),
  category: Yup.string().required("Category is required"),
});

const AddServiceForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();  // ✅ Initialize useNavigate
  const [uploadImage, setUploadingImage] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const { categories } = useSelector((state: RootState) => state.categories || { categories: [] });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      images: [],
      category: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await dispatch(createService({ request: values, jwt: localStorage.getItem("jwt") }));
        setSnackbarMessage("Service created successfully!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);

        // ✅ Navigate to services table after 1 second
        setTimeout(() => {
          navigate("/vendor/services");
          window.location.reload();  // ✅ Refresh page
        }, 1000);

      } catch (error) {
        setSnackbarMessage("Failed to add service. Please try again.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="space-y-4 p-4">
        <Grid container spacing={2}>
          <Grid className="flex flex-wrap gap-5" item xs={12}>
            <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                <AddPhotoAlternateIcon className="text-gray-700" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div className="relative" key={index}>
                  <img className="w-24 h-24 object-cover" src={image} alt={`ServiceImage ${index + 1}`} />
                  <IconButton onClick={() => handleRemoveImage(index)} size="small" color="error" sx={{ position: "absolute", top: 0, right: 0 }}>
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField fullWidth id="title" name="title" label="Title" value={formik.values.title} onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)} helperText={formik.touched.title && formik.errors.title} required />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField multiline rows={4} fullWidth id="description" name="description" label="Description" value={formik.values.description}
              onChange={formik.handleChange} error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description} required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth id="mrpPrice" name="mrpPrice" label="MRP Price" type="number" value={formik.values.mrpPrice} onChange={formik.handleChange}
              error={formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)} helperText={formik.touched.mrpPrice && formik.errors.mrpPrice} required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth id="sellingPrice" name="sellingPrice" label="Selling Price" type="number" value={formik.values.sellingPrice}
              onChange={formik.handleChange} error={formik.touched.sellingPrice && Boolean(formik.errors.sellingPrice)}
              helperText={formik.touched.sellingPrice && formik.errors.sellingPrice} required />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={formik.touched.category && Boolean(formik.errors.category)} required>
              <InputLabel id="category-label">Category</InputLabel>
              <Select labelId="category-label" id="category" name="category" value={formik.values.category} onChange={formik.handleChange} label="Category">
                <MenuItem value=""><em>None</em></MenuItem>
                {categories.map((item) => <MenuItem key={item.categoryId} value={item.categoryId}>{item.name}</MenuItem>)}
              </Select>
              <FormHelperText>{formik.touched.category && formik.errors.category}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button sx={{ p: "14px" }} color="primary" variant="contained" fullWidth type="submit">Add Service</Button>
          </Grid>
        </Grid>
      </form>

      {/* ✅ Snackbar for Success/Error */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity={snackbarSeverity} variant="filled">{snackbarMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default AddServiceForm;
