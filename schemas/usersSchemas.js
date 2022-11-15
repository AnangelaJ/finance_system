const Joi = require('joi').extend(require('@joi/date'));;

const id = Joi.number().min(1).max(5000);
const name = Joi.string().alphanum().min(2).max(50);
const lastname = Joi.string().alphanum().min(3).max(50);
const username = Joi.string().alphanum().min(3).max(15);
const password = Joi.string().alphanum().min(8).max(15);
const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
const phone = Joi.string().length(10).pattern(/^[0-9]+$/);
const dni = Joi.string().min(1).max(25);
const birthdate = Joi.date().format('YYYY-MM-DD').utc();
//const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));

const createUserSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  username: username.required(),
  password: password.required(),
  email: email.required(),
  phone: phone,
  dni: dni.required(),
  birthdate: birthdate.required()
});

const updateUserSchema = Joi.object({
  name: name,
  lastname: lastname,
  username: username,
  password: password,
  email: email,
  phone: phone
});

const showUserSchema = Joi.object({
  id: id.required()
});

const resetPassSchema = Joi.object({
  password: password.required()
})

module.exports = { createUserSchema, updateUserSchema, showUserSchema, resetPassSchema }
