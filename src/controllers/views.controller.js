import { CartServiceWithDAO } from "../services/cartDBManager.js";
import { ProductServiceWithDAO } from "../services/productDBManager.js";

const viewProductsController = async (req, res) => {
  const products = await ProductServiceWithDAO.getAllProducts(req.query);

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
  const products = await ProductServiceWithDAO.getAllProducts(req.query);
  res.render("realTimeProducts", {
    title: "Productos",
    style: "index.css",
    products: JSON.parse(JSON.stringify(products.docs)),
  });
};

const viewCartController = async (req, res) => {
  const response = await CartServiceWithDAO.getProductsFromCartByID(
    req.params.cid
  );

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
