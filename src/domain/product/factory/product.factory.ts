import IProduct from "../entity/IProduct";
import Product from "../entity/product";
import ProductWithDescount from "../entity/productWithDescount";

import {v4} from "uuid";

class ProductFactory {
  public static Create(name: string, price: number, descount=false): IProduct {
    const id = v4();

    if (descount) {
      return new ProductWithDescount(id, name, price);
    }

    return new Product(id, name, price);
  }
}

export default ProductFactory;