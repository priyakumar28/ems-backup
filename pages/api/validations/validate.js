const { phone } = require("phone");
const Fone = (numb) => {
  return phone(numb).isValid
    ? `${numb} is an invalid number`
    : `The number you have entered is invalid`;
};