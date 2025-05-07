const Joi = require("joi");
const User = require("../model/user.model");
const bcrypt=require("bcryptjs")
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  password: Joi.string().required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

const createUser = async (req, res, next) => {
  try {
    const data = req.body;
    const { error, value } = schema.validate(data, {
      allowUnknown: true,
    });
    if (error) {
      throw new Error(error);


    }
    const password=value.password
    delete value.password

const salt = await bcrypt.genSalt(10);
const hashedpassword = await bcrypt.hash(password, salt);

    const user = await User.create({...value,password:hashedpassword});
    res.status(201).send("Signedup successfully");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
};
