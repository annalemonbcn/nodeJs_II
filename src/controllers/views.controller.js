import { cartDBManager } from "../dao/cartDBManager.js";
import { productDBManager } from "../dao/productDBManager.js";

const ProductService = new productDBManager();
const CartService = new cartDBManager(ProductService);

const viewProductsController = async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);

  res.render("index", {
    title: "Productos",
    style: "index.css",
    products: JSON.parse(JSON.stringify(products.docs)),
    prevLink: {
      exist: products.prevLink ? true : false,
      link: products.prevLink,
    },
    nextLink: {
      exist: products.nextLink ? true : false,
      link: products.nextLink,
    },
  });
};

const viewRealTimeProductsController = async (req, res) => {
  const products = await ProductService.getAllProducts(req.query);
  res.render("realTimeProducts", {
    title: "Productos",
    style: "index.css",
    products: JSON.parse(JSON.stringify(products.docs)),
  });
};

const viewCartController = async (req, res) => {
  const response = await CartService.getProductsFromCartByID(req.params.cid);

  if (response.status === "error") {
    return res.render("notFound", {
      title: "Not Found",
      style: "index.css",
    });
  }

  res.render("cart", {
    title: "Carrito",
    style: "index.css",
    products: JSON.parse(JSON.stringify(response.products)),
  });
};

export {
  viewProductsController,
  viewRealTimeProductsController,
  viewCartController,
};
