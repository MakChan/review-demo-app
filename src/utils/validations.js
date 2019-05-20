import { object, string } from "yup";

const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9]*$/;

export const signUpSchema = object().shape({
  username: string()
    .required("Enter username")
    .matches(usernameRegExp, "Invalid username"),
  password: string()
    .required("Enter password")
    .min(8, "Too Short!")
});

export const loginSchema = object().shape({
  username: string()
    .required("Enter username")
    .matches(usernameRegExp, "Invalid username"),
  password: string().required("Enter password")
});

export const reviewSchema = object().shape({
  title: string().required("Enter title"),
  body: string().required("Enter content"),
  rating: string().required("Enter rating")
});
