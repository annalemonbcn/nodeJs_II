import { cartModel } from "../db/models/cartModel.js";

class cartDAO {
  constructor() {}

  async getCartById(cid) {
    const cart = await cartModel
      .findOne({ _id: cid })
      .populate("products.product");

    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    return cart;
  }

  async create() {
    return await cartModel.create({ products: [] });
  }

  async addProduct(cid, pid) {
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    const index = cart.products.findIndex(
      (item) => item.product.toString() === pid
    );

    if (index !== -1) {
      cart.products[index].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await cartModel.updateOne({ _id: cid }, { products: cart.products });
  }

  async deleteProduct(cid, pid) {
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    const newProducts = cart.products.filter(
      (item) => item.product.toString() !== pid
    );

    await cartModel.updateOne({ _id: cid }, { products: newProducts });
  }

  async updateAllProducts(cid, products) {
    await cartModel.updateOne({ _id: cid }, { products });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    const index = cart.products.findIndex(
      (item) => item.product.toString() === pid
    );

    if (index === -1)
      throw new Error(`El producto ${pid} no existe en el carrito ${cid}!`);

    cart.products[index].quantity = quantity;

    await cartModel.updateOne({ _id: cid }, { products: cart.products });
  }

  async deleteAllProducts(cid) {
    await cartModel.updateOne({ _id: cid }, { products: [] });
  }
}

export { cartDAO };
