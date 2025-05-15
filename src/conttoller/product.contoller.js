const Joi = require("joi");
const Category = require("../model/category.model");
const Product = require("../model/product.model");

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string(),
  createdBy: Joi.string(),
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
      .skip((page-1)*perPage)
      .limit(perPage)
      .populate("createdBy", { password: 0 ,role:0});
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { error, value } = productSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (!error) {
      await Product.create(value);
      res.status(200).send({ message: "Product created sucessfully" });
    } else {
  throw error
    }
  } catch (err) {
   
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
};
