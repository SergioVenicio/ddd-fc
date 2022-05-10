import Product from "../entities/product";
import { ParameterValueError } from "../../errors/errors";

class ProductService {
  public static IncreasePrice(products: Product[], percentage: number): Product[] {
    if (products.length === 0) {
      throw new ParameterValueError("Products are empty.")
    }
    if (percentage <= 0) {
      throw new ParameterValueError("IncreasePersentage must be greater than zero.")
    }

    return products.map(product => {
      const newPrice = product.price + (product.price * (percentage / 100));
      return new Product(product.id, product.name, newPrice);
    });
  }
}

export default ProductService;