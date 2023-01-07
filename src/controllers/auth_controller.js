let { signup_schema, signin_schema } = require("../validators/validations");
let { authService } = require("../services/index");
let utilLibrary = require('../library/index')
let {failResponse } = require('../library/response_constants')
const users = require("../models/User");

const controller = "[auth_controller]"
class Auth_Controller {
  async Signup(req, res) {
    const method = "[Signup]";
    let securePassword , user , signedData, obj , query , user_query , created_user;
    try {
      await signup_schema.validateAsync(req.body);
      query = { email: req.body.email };
      user = await authService.findOne(query);
      if (user) {
        return res
          .status(400)
          .send(failResponse.USER_EXISTS);
      }
      securePassword = await utilLibrary.generateHash(req.body.password)
      user_query = {
        name: req.body.name,
        email: req.body.email,
        password: securePassword,
      };
      created_user = await authService.create(user_query);
      obj = { user: { id: created_user.id } };
      signedData = await utilLibrary.createAccessToken(obj)
      return res.status(200).send({ token: signedData });
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async Signin(req, res) {
    const method = "[Signin]";
    let query , user , user_exists , payload , signedData;
    try {
      await signin_schema.validateAsync(req.body);
      let { email, password } = req.body;
      query = { email: email };
      user = await authService.findOne(query);
      if (!user) {
        return res.status(400).send(failResponse.USER_NOT_EXISTS);
      }
      user_exists = await utilLibrary.comparePassword(password,user.password)
      if (!user_exists) {
        return res.status(400).send(failResponse.USER_NOT_EXISTS);
      }
      payload = { loginUser: { id: user.id } };
      signedData = await utilLibrary.createAccessToken(payload)
      return res.status(200).send({ token: signedData });
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async getUser(req, res) {
    const method = "[getUser]";
      let query , user;
    try {
      let data = req.user;
      if (!data) {
        return res
          .status(400)
          .send(failResponse.TOKEN_INVALID);
      }
      let id = data.loginUser.id;
      query = { _id: id };
      user = await authService.findById(query);
      return res.status(200).send(user);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async updateUser(req, res) {
    const method = "[updateUser]";
    let condition , updateQuery , updated;
    try {
      let { id, name } = req.body;
      condition = { _id: id };
      updateQuery = { name: name };
      updated = await authService.updateOne(condition, updateQuery);
      return res.status(200).send(updated);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
  async removeUser(req, res) {
    const method = "[removeUser]";
    let query , deleted;
    try {
      let { id } = req.body;
      query = { _id: id };
      deleted = await authService.deleteOne(query);
      return res.status(200).send(deleted);
    } catch (err) {
      console.log(`Error : ${method} ${controller}`, err);
      return res.status(500).send(err);
    }
  }
}

module.exports = Auth_Controller;
