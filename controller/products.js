const Product = require("../models/Product");

const getProducts = async (req, res) => {
  const { name, featured, company, sort, select, page, limit, numericFilters } =
    req.query;
  const queryObject = {};

  if (name) {
    queryObject.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["rating", "price"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: value };
      }
    });
  }

  let result = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  }

  if (select) {
    const fieldsList = select.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const skip = ((Number(page) ?? 1) - 1) * limit;

  const products = await result.skip(skip).limit(limit);
  res.status(200).json({ nbHits: products.length, products });
};

const getProduct = async (req, res) => {
    const {id: productId} = req.params
    const product = await Product.findOne({_id: productId})

    return res.status(200).json({product})
};

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)

    return res.status(201).json({product})
};

const updateProduct = async (req, res) => {
    const {id: productId} = req.params

    const product = await Product.findOneAndUpdate({_id: productId}, req.body, {
        new:true,
        runValidators: true
    })

    return res.status(200).json({product})
};

const deleteProduct = async (req, res) => {
    const {id: productId} = req.params

    const product = await Product.findOneAndDelete({_id: productId})

    return res.status(200).json({product})
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
