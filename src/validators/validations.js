let joi = require("joi");

let signup_schema = joi.object({
  name: joi.string().min(3).max(15).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

let signin_schema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  // token : joi.string(),
});

let note_schema_validate = joi.object({
  title: joi.string().min(4).required(),
  description: joi.string().min(5).required(),
  tag: joi.string()
});
module.exports = { signup_schema, signin_schema, note_schema_validate };
