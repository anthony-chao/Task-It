const Validator = require("validator");
const validText = require("./valid-text")

module.exports = function validateTaskInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : "";
    data.description = validText(data.description) ? data.description : "";

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required"
    }

    if (!Validator.isLength(data.description, {min: 1, max: 120})) {
        errors.description = "Description must be between 1 and 120 characters"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
