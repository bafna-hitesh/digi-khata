const validateMessages = {
  required: '${label} is required!',
  types: {
    email: 'Invalid email address... Try again',
    number: 'Invalid number... Try again',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default validateMessages;
