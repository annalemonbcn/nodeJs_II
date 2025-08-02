import { ProductServiceWithDAO } from "../services/productDBManager.js";

const getAllProductsController = async (req, res) => {
  const result = await ProductServiceWithDAO.getAllProducts(req.query);

  res.send({
    status: "success",
    payload: result,
  });
};

const getProductByIDController = async (req, res) => {
  try {
    const result = await ProductServiceWithDAO.getProductByID(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

const createProductController = async (req, res) => {
  if (req.files) {
    req.body.thumbnails = [];
    req.files.forEach((file) => {
      req.body.thumbnails.push(file.path);
    });
  }

  try {
    const result = await ProductServiceWithDAO.createProduct(req.body);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  if (req.files) {
    req.body.thumbnails = [];
    req.files.forEach((file) => {
      req.body.thumbnails.push(file.filename);
    });
  }

  try {
    const result = await ProductServiceWithDAO.updateProduct(
      req.params.pid,
      req.body
    );
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const result = await ProductServiceWithDAO.deleteProduct(req.params.pid);
    res.send({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
};

export {
  getAllProductsController,
  getProductByIDController,
  createProductController,
  updateProductController,
  deleteProductController,
};
