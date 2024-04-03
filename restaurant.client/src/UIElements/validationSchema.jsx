import * as yup from "yup";

const baseSchema = {
  name: yup.string().required("Name is required").matches(/^[A-Za-z-]+$/, "Name must contain only letters and -"),
  surname: yup.string().required("Surname is required").matches(/^[A-Za-z-]+$/, "Surname must contain only letters and -"),
  address: yup.string().required("Address is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must contain only numbers")
    .max(13, "Phone number must be at most 13 characters long"),
  email: yup.string().email("Invalid email address").required("Email is required"),
  paymentType: yup.string().required("Please select an option"),
};

export const ValidationSchema = (isPasswordRequired) => {
  return yup.object({
    ...baseSchema,
    ...(isPasswordRequired ? { password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required") } : {}),
  });
};

export default ValidationSchema;