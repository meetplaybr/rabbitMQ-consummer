const {
  getProductsService,
  createNotification,
  createProcuctService,
  updateProductReaction,
} = require("../services/product.services")
const sse = require("../sse")

const getProductsController = async (req, res) => {
  console.log("Buscando getProducts...")
  const result = await getProductsService();
  sse.send('busca realizada', 'message')
  res.status(result.statusCode).json(result);
}
const createProductController = async (req, res) => {
  const body = req.body
  const result = await createProcuctService(body);
  res.status(result.statusCode).json(result)
  if (!result.error){
    sse.send(result.data[0], "product")
  }
}
const updateProductController = async (req, res) => {
  
  const productId = req.query.id
  const updateProduct = req.body
  const userId = req.body.userId
  const result = await updateProductReaction(productId, updateProduct);
  res.status(result.statusCode).json(result)
  if(!result.error){
    const product = result.data[0];
    const data = {inventoryStatus: userId, product}
    // emit product event to all users
    sse.send(data, "product_reaction");
    if (product.userId !== userId){
      const authorId = product.userId;
      const _notif = createNotification({productId, userId, authorId});
      // emit notification para user e author
      sse.send(_notif, `notification_${authorId}`)
    }
  }
}
module.exports = {
  createProductController,
  updateProductController,
  getProductsController
}