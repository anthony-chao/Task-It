const Validator = require("validator");
const validText = require("./valid-text")

module.exports = function validateTaskInput(data) {
    let errors = {};

    data.title = validText(data.title) ? data.title : "";
    data.description = validText(data.description) ? data.description : "";

    // if (Validator.isEmpty(data.title)) {
    //     errors.title = "Title field is required"
    // }

    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required"
    }

    // if (!Validator.isLength(data.title, {min: 5, max: 50})) {
    //     errors.title = "Title must be between 5 and 50 characters";
    // }

    // if (!Validator.isLength(data.description, {min: 5, max: 140})) {
    //     errors.description = "Description must be between 5 and 140 characters"
    // }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
