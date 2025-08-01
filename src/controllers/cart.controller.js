import { cartDBManager } from "../dao/cartDBManager.js";
import { productDBManager } from "../dao/productDBManager.js";

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

const createCartController = async (req, res) => {
  try {
    const result = await CartService.createCart();
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

const getCartByIdController = async (req, res) => {
  try {
    const result = await CartService.getProductsFromCartByID(req.params.cid);
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

const addProductToCartController = async (req, res) => {
  try {
    const result = await CartService.addProductByID(
      req.params.cid,
      req.params.pid
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

const deleteProductFromCartController = async (req, res) => {
  try {
    const result = await CartService.deleteProductByID(
      req.params.cid,
      req.params.pid
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

const replaceProductsFromCartController = async (req, res) => {
  try {
    const result = await CartService.updateAllProducts(
      req.params.cid,
      req.body.products
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

const updateProductQuantityController = async (req, res) => {
  try {
    const result = await CartService.updateProductByID(
      req.params.cid,
      req.params.pid,
      req.body.quantity
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

const deleteCartController = async (req, res) => {
  try {
    const result = await CartService.deleteAllProducts(req.params.cid);
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
  getCartByIdController,
  createCartController,
  addProductToCartController,
  deleteProductFromCartController,
  replaceProductsFromCartController,
  updateProductQuantityController,
  deleteCartController,
};
