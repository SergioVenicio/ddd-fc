import Product from "../../../../domain/product/entity/product";
import IProductRepository from "../../../../domain/product/repository/IProductRepository";
import { ProductNotFoundError } from "../../../../domain/@shared/errors/errors";
import ProductModel from "./product.model";

class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {name: entity.name, price: entity.price},
      {where: {id: entity.id}}
    );
  }
  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({where: {id}});
    if (!(productModel)) {
      throw new ProductNotFoundError(`Product ${id} not found!`);
    }
    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    );
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(p => (
      new Product(p.id, p.name, p.price)
    ));
  }
}

export default ProductRepository;