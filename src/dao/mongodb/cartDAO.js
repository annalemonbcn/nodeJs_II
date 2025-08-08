import { cartModel } from "../../db/models/cartModel.js";
import TicketModel from "../../db/models/ticketModel.js";

class cartDAO {
  constructor() {}

  #generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  async #getPopulatedCart(cid) {
    return await cartModel
      .findOne({ _id: cid })
      .populate("products.product")
      .populate("user");
  }

  async assignCartToUser(cartId, userId) {
    return await cartModel.findByIdAndUpdate(
      cartId,
      { user: userId },
      { new: true }
    );
  }

  async getCartById(cid) {
    const cart = await this.#getPopulatedCart(cid);

    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    return cart;
  }

  async create(userId) {
    return await cartModel.create({ user: userId, products: [] });
  }

  async addProduct(cid, pid) {
    const cart = await this.#getPopulatedCart(cid);
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
    const cart = await this.#getPopulatedCart(cid);
    if (!cart) throw new Error(`El carrito ${cid} no existe!`);

    const newProducts = cart.products.filter(
      (item) => item.product._id.toString() !== pid
    );

    await cartModel.updateOne({ _id: cid }, { products: newProducts });
  }

  async updateAllProducts(cid, products) {
    await cartModel.updateOne({ _id: cid }, { products });
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await this.#getPopulatedCart(cid);
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

  async purchase(cid, userEmail) {
    const cart = await this.#getPopulatedCart(cid);
    if (!cart) throw new Error("Cart not found");

    if (cart.user.email.toString() !== userEmail) {
      throw new Error("Unauthorized");
    }

    const rejectedProducts = [];

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      if (product.stock < quantity) {
        rejectedProducts.push({
          product: { id: product._id, title: product.title },
          requested: quantity,
          available: product.stock,
        });
      }
    }

    if (rejectedProducts.length > 0) {
      return { ticket: null, rejectedProducts };
    }

    const purchasedProducts = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = item.product;
      const quantity = item.quantity;

      product.stock -= quantity;
      await product.save();

      purchasedProducts.push({
        product: product._id,
        quantity,
        priceAtPurchase: product.price,
      });

      totalAmount += product.price * quantity;
    }

    const ticket = await TicketModel.create({
      code: this.#generateCode(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: cart.user._id,
      productsSnapshot: purchasedProducts,
    });

    await this.deleteAllProducts(cid);

    return { ticket, rejectedProducts: [] };
  }
}

export { cartDAO };
