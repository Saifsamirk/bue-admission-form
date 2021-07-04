import Joi from "joi-browser";

export const validate = (data, schema) => {
  const result = Joi?.validate(data, schema);
  if (!result?.error) return null;
  const errors = {};
  for (let item of result?.error?.details) {
    errors[item.path[0]] = item?.message;
  }
  return errors;
};

export const getFieldError = (input, schema, error) => {
  if (schema != null && schema[input.name] != null) {
    const errorMessage = validateProperty(input, schema);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
  }
  return error;
};

export const validateProperty = (input, schema) => {
  const obj = { [input.name]: input.value.toString().trim() };
  const fieldSchema = { [input.name]: schema[input.name] };
  if (fieldSchema[input.name] === null) return null;
  const { error } = Joi.validate(obj, fieldSchema);
  return error ? error.details[0].message : null;
};

export const handleChange = (input, schema, error, data) => {
  if (schema[input.name] != null) {
    const errorMessage = validateProperty(input, schema);
    //    console.log("errorMessage", errorMessage);
    if (errorMessage) error[input.name] = errorMessage;
    else delete error[input.name];
  }
  data[input.name] = input.value.toString().trim();
  if (
    input.value.toString().trim() === null ||
    input.value.toString().trim() === ""
  )
    input.value = "";
};
