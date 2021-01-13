const catchFieldErrors = (setErrors, err) => {
  if (!err.response) return;
  setErrors(err.response.data || {});
};

export default catchFieldErrors;
