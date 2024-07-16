const multer = require('multer');
const {
  getProductsController,
  createProductController,
  updateProductController,
} = require("../controllers/product.controller")
const express = require("express");
const router = express.Router()
const multerConfig = require('../config/multer/index');
const PhotoModel = require('../models/photoModel');
router.get("/product", getProductsController);
router.post("/product", createProductController);
router.put('/product', updateProductController);
router.post('/images', multer(multerConfig).single('file'), async (req, res) => {
  const { originalname: name, size, key, location: url = "" } = req.file;
  const {productId, userId} = req.body
  const photo = await PhotoModel.create({
    name,
    size,
    key,
    url,
    productId,
    userId,
  });

  return res.json(photo);
})
router.get("/images", async (req, res) => {
  const photos = await PhotoModel.find({productId: req.query.id});
  return res.json(photos);
});
router.delete("/images", async (req, res) => {
  try {
    const deletedPhoto = await PhotoModel.findOneAndDelete({ _id:req.query.id});
    if (!deletedPhoto) {
      return res.status(404).json({ message: 'Foto não encontrada' });
    }

    return res.json({ message: 'Foto excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir a foto:', error);
    return res.status(500).json({ message: 'Erro ao excluir a foto' });
  }
});
module.exports = router

