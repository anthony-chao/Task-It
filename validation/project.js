const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.name = validText(data.name) ? data.name : "";
  data.description = validText(data.description) ? data.description : "";

  if (!Validator.isLength(data.name, { min: 3, max: 40 })) {
    errors.name = 'Project name must be between 3 and 40 characters';
  }

  if (!Validator.isLength(data.description, { min: 3, max: 40 })) {
    errors.description = 'Project description must be between 3 and 40 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
