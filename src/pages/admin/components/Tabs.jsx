import { Tabs, Tab, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NewProductUpload, NewProductCategory } from ".";
import { Form, Formik } from "formik/dist";
import { useCreatePoductMutation } from "redux/slices/adminSlice";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEditProductMutation } from "redux/slices/productSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  price: Yup.number("price in number ").required("Required"),
  category: Yup.string().required("Required"),
  stock_count: Yup.number().required("Required"),
  // file: Yup.string().required("Required"),
});
export default function TabsComponent({ value, setValue, type, product }) {
  const handleChange = (_, newValue) => setValue(newValue);

  const [createProduct] = useCreatePoductMutation();
  const [editProduct] = useEditProductMutation();
  const navigate = useNavigate();
  const handleSumit = async (values) => {
    const { name, file, price, stock_count, description, category } = values;

    const form = new FormData();
    form.append("name", name);
    form.append("desc", description);
    form.append("price", price);
    form.append("category", category.toLowerCase());
    form.append("stock_count", stock_count);

    if (file.file.length === 1) {
      form.append("images", file.file[0]);
    } else {
      for (let i = 0; i < file.file.length; i++) {
        form.append("images", file.file[i]);
      }
    }

    if (type !== "edit") {
      const { data, error } = await createProduct(form);

      if (data) {
        toast.success(data?.message);
        setTimeout(() => navigate("/products"), 3000);
      }
      if (error) toast.success(data?.error);
    } else {
      form.append("id", product?.id);
      const { data, error } = await editProduct(form);

      if (data) {
        toast.success(data?.message);
        setTimeout(() => navigate("/products"), 3000);
      }
      if (error) toast.success(data?.error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={
          type === "edit"
            ? {
                name: product?.name,
                file: null,
                price: product?.price,
                description: product?.desc,
                category: product?.category,
                stock_count: product?.stock_count,
              }
            : {
                name: "",
                file: null,
                price: "",
                description: "",
                category: "",
                stock_count: "",
              }
        }
        onSubmit={handleSumit}
      >
        {({ values, isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon tabs for creating new  product"
            >
              <Tab icon={<PhoneIcon />} aria-label="phone" />
              <Tab icon={<FavoriteIcon />} aria-label="favorite" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <NewProductUpload values={values} setValue={setValue} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <NewProductCategory isSubmitting={isSubmitting} />
            </TabPanel>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { sm: 3, xs: 1 } }}>{children}</Box>}
    </div>
  );
}
