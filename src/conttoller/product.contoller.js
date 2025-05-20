const Joi = require("joi");
const Category = require("../model/category.model");
const Product = require("../model/product.model");
const mongoose = require("mongoose");
const path = require("path");
const { deleteImage } = require("../utils/deleteImage");
const APIError = require("../utils/apiError");
const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  createdBy: Joi.string(),
  image: Joi.array().items(Joi.string()).required(),
});

const getProducts = async (req, res, next) => {
  try {
    let sort = req.query.sort || "dateDesc";
    let priceFrom = parseFloat(req.query.priceFrom) || 0;
    let priceTo = parseFloat(req.query.priceTo) || 9999999999;
    let perPage = parseInt(req.query.perPage) || 5;
    let page = parseInt(req.query.page) || 1;

    let sortBy = {
      createdAt: -1,
    };

    if (sort == "priceAsc") {
      sortBy = { price: 1 };
    } else if (sort == "priceDesc") {
      sortBy = { price: -1 };
    } else if (sort == "titleAsc") {
      sortBy = { title: 1 };
    } else if (sort == "titleDesc") {
      sortBy = { title: -1 };
    }

    let productFilter = {
      name: new RegExp(req.query.search, "i"),

      $and: [{ price: { $gte: priceFrom } }, { price: { $lte: priceTo } }],
    };
    const product = await Product.find(productFilter)
      .populate("category")
      .sort(sortBy)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate("createdBy", { password: 0, role: 0 });
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  if (req.files) {
    req.body.image = [];
    req.files.map((el, index) => {
      let imagePath = "";
      imagePath = path
        .join("/", "uploads", `${el.filename}`)
        .replaceAll("\\", "/");

      req.body.image[index] = imagePath;
    });

    try {
      const { error, value } = productSchema.validate(req.body, {
        allowUnknown: true,
      });

      if (!error) {
        await Product.create(value);
        res.status(200).send({ message: "Product created sucessfully" });
      } else {
        throw error;
      }
    } catch (err) {
      // image delete image from uploads
      // by using fs
      if (req.files) {
        req.files.map((el) => {
         const res= deleteImage(el.filename);
 
        });
      }
console.log(err)

      next(err);
    }
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const id = new mongoose.Types.ObjectId(productId);
    const productDetails = await Product.findById(id);
    res.status(200).send(productDetails);
  } catch (err) {
    next(err);
  }
};

const deletePorduct = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    await Product.FindOneAndDelete(id);
    res.status(200).send({ message: "Operation success" });
  } catch (err) {
    next(err);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);

    const { error, value } = productSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (!error) {
      const updatedData = await Product.findByIdAndUpdate(id, value);
      res.status(200).send(updatedData);
    } else {
      throw error;
    }
  } catch (err) {
    //delete
    next(err);
  }
};



module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  deletePorduct,
  updateProduct,
};
