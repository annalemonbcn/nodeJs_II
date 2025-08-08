import { CartServiceWithDAO } from "../services/cartDBManager.js";

const createCartController = async (req, res) => {
  try {
    const result = await CartServiceWithDAO.createCart();
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
    const result = await CartServiceWithDAO.getProductsFromCartByID(
      req.params.cid
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

const addProductToCartController = async (req, res) => {
  try {
    const result = await CartServiceWithDAO.addProductByID(
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
    const result = await CartServiceWithDAO.deleteProductByID(
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
    const result = await CartServiceWithDAO.updateAllProducts(
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
    const result = await CartServiceWithDAO.updateProductByID(
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
    const result = await CartServiceWithDAO.deleteAllProducts(req.params.cid);
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

const purchaseCartController = async (req, res) => {
  try {
    const { ticket, rejectedProducts } = await CartServiceWithDAO.purchaseCart(
      req.params.cid,
      req.user.email
    );

    if (!ticket) {
      return res.status(400).send({
        status: "error",
        message:
          "Not enough stock on one or more products. Please delete the following products from your cart and try again.",
        rejectedProducts,
      });
    }

    res.send({
      status: "success",
      payload: ticket,
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
  purchaseCartController,
};
