const catchFieldErrors = (setFieldErrors, err) => {
  const res = err.response;
  if (!res) return;
  let errors = {};

  if (res.status == 422 && typeof res.data?.errors === 'object') {
    Object.keys(res.data.errors).forEach((key) => {
      errors[key] = res.data.errors[key][0];
    });
  } else if (res.data?.fields) {
    errors = res.data.fields;
  }

  setFieldErrors(errors);
};

export default catchFieldErrors;
