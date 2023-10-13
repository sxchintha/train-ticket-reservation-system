const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

// validations for phone number
const isValidPhoneNumber = (phoneNumber) => {
  return phoneNumber.length === 10 && !isNaN(phoneNumber);
};

export { isValidEmail, isValidPhoneNumber };
