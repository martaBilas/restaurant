import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Za-z-]+$/, "Name must contain only letters and -"),
 
    surname: Yup.string()
    .required("Surname is required")
    .matches(/^[A-Za-z-]+$/, "Surname must contain only letters and -"),
 
    address: Yup.string().required("Address is required"),
 
    phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must contain only numbers")
    .max(13, "Phone number must be at most 13 characters long"),
 
    email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
 
    paymentType: Yup.string().required("Please select an option"),
 
    password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default validationSchema;
