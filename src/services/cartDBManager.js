import { cartDAO } from "../dao/cartDAO.js";
import { ProductServiceWithDAO } from "./productDBManager.js";

class cartDBManager {
  constructor(productDBManager, cartDao) {
    this.productDBManager = productDBManager;
    this.cartDao = cartDao;
  }

  async getProductsFromCartByID(cid) {
    return await this.cartDao.getCartById(cid);
  }

  async createCart() {
    return await this.cartDao.create();
  }

  async addProductByID(cid, pid) {
    await this.productDBManager.getProductByID(pid);
    await this.cartDao.addProduct(cid, pid);
    return await this.getProductsFromCartByID(cid);
  }

  async deleteProductByID(cid, pid) {
    await this.productDBManager.getProductByID(pid);
    await this.cartDao.deleteProduct(cid, pid);
    return await this.getProductsFromCartByID(cid);
  }

  async updateAllProducts(cid, products) {
    for (const item of products) {
      await this.productDBManager.getProductByID(item.product);
    }
    await this.cartDao.updateAllProducts(cid, products);
    return await this.getProductsFromCartByID(cid);
  }

  async updateProductByID(cid, pid, quantity) {
    if (!quantity || isNaN(parseInt(quantity)))
      throw new Error(`La cantidad ingresada no es válida!`);

    await this.productDBManager.getProductByID(pid);
    await this.cartDao.updateProductQuantity(cid, pid, parseInt(quantity));
    return await this.getProductsFromCartByID(cid);
  }

  async deleteAllProducts(cid) {
    await this.cartDao.deleteAllProducts(cid);
    return await this.getProductsFromCartByID(cid);
  }
}

export const CartServiceWithDAO = new cartDBManager(
  ProductServiceWithDAO,
  new cartDAO()
);
