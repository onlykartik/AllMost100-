import * as React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";

import ConfirmDialog from "../dialog";
import Header from "../../global/Header";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  title: "",
  description: "",
  dueDates1: "",
  university: "",
  reference: new URLSearchParams(window.location.search).get("reference"),
};

const phoneRegExp =
  /^(?:\+\d{1,3}\s?)?(?:\(\d{1,4}\))?\s?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;

const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  dueDates1: yup.string(),
  university: yup.string().required("required"),
  reference: yup.string().required("required"),
});

function Form() {

  const [formData, setFormData] = useState({});
  const [dueDate, setDueDate] = useState("");

  const searchParams = new URLSearchParams(window.location.search).get("reference");

  if(searchParams){
    console.log("inside the if condition");
    console.log(new URLSearchParams(window.location.search).get("reference"));
  }else{
    console.log("inside else statement")
    return (
    <Box>
      <Typography align="center" color={"red"} variant="h3"> Reference email is missing </Typography>  
    </Box>)
  }

  const handleFormSubmit = (values) => {
    values["dueDates1"] = dueDate;

    console.log(values);
    setFormData(values);
  };

  return (
    <Box m="20px">
      <Header name={"Request Subject Form"} />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={userSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Box
                display={"grid"}
                gap="30px"
                gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
                
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email.toLocaleLowerCase()}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={!!touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={!!touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                  rows={4}
                />

                <TextField
                  fullWidth
                  multiline
                  variant="filled"
                  type="text"
                  label="University"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.university}
                  name="university"
                  error={!!touched.university && !!errors.university}
                  helperText={touched.university && errors.university}
                />

                <input
                  type="date"
                  label="DueDates1"
                  name="dueDates1"
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    console.log(e.target.value);
                  }}
                />

                <TextField
                  id="outlined-read-only-input"
                  label="Reference"
                  name="reference"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reference}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Box
                display={"flex"}
                justifyContent={"start"}
                m={"20px 0px 20px 0"}
                
              >
                {/*   <Button type="submit" color="secondary" size="large">REQUEST MENTOR</Button>  */}
                <ConfirmDialog data={formData} />
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
}

export default Form;
