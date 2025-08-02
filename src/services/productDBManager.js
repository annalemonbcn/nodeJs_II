import { productsDAO } from "../dao/productsDAO.js";

class productDBManager {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllProducts(params) {
    return await this.dao.get(params);
  }

  async getProductByID(pid) {
    return await this.dao.getById(pid);
  }

  async createProduct(product) {
    return await this.dao.create(product);
  }

  async updateProduct(pid, productUpdate) {
    return await this.dao.update(pid, productUpdate);
  }

  async deleteProduct(pid) {
    return await this.dao.delete(pid);
  }
}

export { productDBManager };
export const ProductServiceWithDAO = new productDBManager(new productsDAO());
