const errorHandler = (err) => {
  let errors = {};

  // console.log(err.message, err.code);

  // Duplicate email address
  if (err.code === 11000) {
    errors.email = "Email already exits. Please try a different Email";
    console.log(errors);
    return errors;
  }

  // Validation errors object && Duplicate email address
  if (err.message.includes("user validation failed") && err.code === 11000) {
    // console.log(Object.values(err.errors));
    Object.values(err.errors).forEach((ind) => {
      errors[ind.properties.path] = ind.properties.message;
    });
    const emailError = {
      email: "Email already exits. Please try a different Email",
    };
    return {
      ...emailError,
      ...errors,
    };
  }

  // Validation errors object
  if (err.message.includes("user validation failed")) {
    // console.log(Object.values(err.errors));
    Object.values(err.errors).forEach((ind) => {
      errors[ind.properties.path] = ind.properties.message;
    });
    console.log(errors);
    return errors;
  }

  errors = { errMsg: err.message };
  return errors;
};

module.exports = {
  errorHandler,
};
