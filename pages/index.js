import { useState } from "react";
import classes from "../styles/Home.module.scss";
import { Button, TextField, Grid } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import * as images from "../utils/exports";
import Joi from "joi-browser";
import * as validationService from "../utils/ValidationService";
import { NetlifyForm, Honeypot } from "react-netlify-forms";
import Image from "next/image";

function App() {
  // Initialize the local state of the component
  const [isForm, setForm] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
  });
  const [errors, setErrors] = useState({});

  // Create a schema for the inputs and their validations inside
  // the form
  const schema = {
    full_name: Joi.string()
      .required()
      .label("Full Name")
      .regex(/^[a-zA-Z0-9 ]+$/)
      .error((errors) => {
        return errors.map((error) => {
          switch (error.type) {
            case "any.empty":
              return { message: "Full Name Is Required" };
          }
        });
      }),
    mobile_number: Joi.string()
      .required()
      .label("Mobile No.")
      .error((errors) => {
        return errors.map((error) => {
          switch (error.type) {
            case "any.empty":
              return { message: "Phone Is Required" };
          }
        });
      }),
    email: Joi.string()
      .email()
      .required()
      .label("Email")
      .error((errors) => {
        return errors.map((error) => {
          switch (error.type) {
            case "any.empty":
              return { message: "Email Is Required" };
            case "string.email":
              return { message: "Email Is Invalid" };
          }
        });
      }),
    date_of_birth: Joi.string()
      .label("Date of Birth")
      .required()
      .error((errors) => {
        return errors.map((error) => {
          switch (error.type) {
            case "any.empty":
              return { message: "Date of Birth Is Required" };
          }
        });
      }),
  };

  // Create a function that handles the change of the
  // input and sets the values inside the form accordingly
  const handleInputChange = ({ currentTarget: input }) => {
    setForm({
      ...isForm,
      [input.name]: input.value,
    });
    const error = { ...errors };
    setErrors({
      ...validationService.getFieldError(input, schema, error),
    });
    // this.setState({ ...this.state, errors: error, brand: value });
  };

  /**
   * to validated input text during touch mode.
   * @param {input} param0
   */
  const onBlur = ({ currentTarget: input }) => {
    const error = { ...errors };
    setErrors({
      ...validationService.getFieldError(input, schema, error),
    });
  };

  return (
    <NetlifyForm
      name="Contact"
      action="/thanks"
      honeypotName="bot-field"
      data-netlify="true"
      onSuccess={() => {
        setForm({
          full_name: "",
          mobile_number: "",
          email: "",
          date_of_birth: "",
        });
      }}
    >
      {({ handleChange, success, error }) => (
        <>
          <Honeypot />
          {success && (
            <p className={classes.success}>Thanks for contacting us!</p>
          )}
          {error && (
            <p className={classes.failure}>
              Sorry, we could not reach our servers. Please try again later.
            </p>
          )}
          <section className={classes.wrapper}>
            <Grid
              container
              justify="center"
              className={classes.form_container}
              height="100%"
              spacing={4}
              md={6}
              sm={8}
              xs={12}
            >
              <Grid item md={12} sm={12} xs={12}>
                <Image height={200} src={images.logo} />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="full_name"
                  label="Full Name"
                  value={isForm.full_name}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  className={classes.field}
                  error={errors.full_name ? true : false}
                  helperText={errors.full_name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image src={images.full_name} width={40} height={40} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="mobile_number"
                  type="number"
                  label="Mobile No."
                  value={isForm.mobile_number}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  className={classes.field}
                  error={errors.mobile_number ? true : false}
                  helperText={errors.mobile_number}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src={images.mobile_number}
                          width={40}
                          height={40}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="email"
                  label="Email"
                  value={isForm.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  className={classes.field}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image src={images.email} width={40} height={40} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  variant="outlined"
                  name="date_of_birth"
                  label="Date of Birth"
                  value={isForm.date_of_birth}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  type="date"
                  className={classes.field}
                  error={errors.date_of_birth ? true : false}
                  helperText={errors.date_of_birth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src={images.date_of_birth}
                          width={40}
                          height={40}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="job"
                  label="Current Job"
                  value={isForm.job}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image
                          src={images.current_job}
                          width={40}
                          height={40}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="employer"
                  label="Employer"
                  value={isForm.employer}
                  onChange={(e) => {
                    handleInputChange(e);
                    handleChange(e);
                  }}
                  onBlur={onBlur}
                  className={classes.field}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Image src={images.employer} width={40} height={40} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={
                    validationService.validate(
                      {
                        full_name: isForm?.full_name?.trim(),
                        email: isForm?.email?.trim(),
                        date_of_birth: isForm?.date_of_birth?.trim(),
                        mobile_number: isForm?.mobile_number?.trim(),
                      },
                      schema
                    ) != null
                  }
                  className={classes.submit_button}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </section>
        </>
      )}
    </NetlifyForm>
  );
}

export default App;
