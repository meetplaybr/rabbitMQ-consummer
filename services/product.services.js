const cuid = require('cuid');
const ProductModel = require("../models/productModel");
const getProductsService = async () => {
  try {
    const products = await ProductModel.find();
    const _length = products.length;
    const message = _length === 0 ? "Not found" : "sucesso";
    const error = _length === 0 ? true : false;
    const statusCode = _length === 0 ? 400 : 200;
    return {data: products, error, message, statusCode} 
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500
    }
  }
}
const createProcuctService = async (product) => {
  try {
    const _product = await ProductModel.create(product);
    return {data: [_product], error: false, message: "sucesso", statusCode: 200}
  } catch (error) {
    return {
      data: [],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500,
    }
  }
}
const updateProductReaction = async (productId, newProduct) =>{
  try {
    console.log(newProduct)
    const product = await ProductModel.findByIdAndUpdate(productId, newProduct, { new: true })
    return {data: [product], error: false, message: "sucesso", statusCode: 200}
  } catch (error) {
    return {
      data:[],
      error: true,
      message: "Sorry an error occurred",
      statusCode: 500
    }
  }
}
const createNotification = ({productId, authorId, userId}) => {
  return {
    id: cuid,
    userId: authorId,
    title: `Your product has been ${userId}`,
    type: "product",
    meta: {
      id: productId
    },
  };
};
module.exports = {
  getProductsService,
  createProcuctService,
  updateProductReaction,
  createNotification
}