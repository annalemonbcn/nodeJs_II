import productModel from "../db/models/productModel.js";

class productsDAO {
  constructor() {}

  async get(params) {
    const paginate = {
      page: params.page ? parseInt(params.page) : 1,
      limit: params.limit ? parseInt(params.limit) : 10,
    };

    if (params.sort && (params.sort === "asc" || params.sort === "desc"))
      paginate.sort = { price: params.sort };

    const products = await productModel.paginate({}, paginate);

    products.prevLink = products.hasPrevPage
      ? `http://localhost:8080/products?page=${products.prevPage}`
      : null;
    products.nextLink = products.hasNextPage
      ? `http://localhost:8080/products?page=${products.nextPage}`
      : null;

    //Add limit
    if (products.prevLink && paginate.limit !== 10)
      products.prevLink += `&limit=${paginate.limit}`;
    if (products.nextLink && paginate.limit !== 10)
      products.nextLink += `&limit=${paginate.limit}`;

    //Add sort
    if (products.prevLink && paginate.sort)
      products.prevLink += `&sort=${params.sort}`;
    if (products.nextLink && paginate.sort)
      products.nextLink += `&sort=${params.sort}`;

    return products;
  }

  async getById(pid) {
    const product = await productModel.findOne({ _id: pid });

    if (!product) throw new Error(`El producto ${pid} no existe!`);

    return product;
  }

  async create(product) {
    const { title, description, code, price, stock, category, thumbnails } =
      product;

    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error("Error al crear el producto");
    }

    return await productModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    });
  }

  async update(pid, productUpdate) {
    return await productModel.updateOne({ _id: pid }, productUpdate);
  }

  async delete(pid) {
    return await productModel.deleteOne({ _id: pid });
  }
}

export { productsDAO };
