import Product from "./product";

class ProductWithDescount extends Product {
  constructor(id: string, name: string, price: number) {
    const priceWithDescount = price - (price * 0.10);
    super(id, name, priceWithDescount);
  }
}

export default ProductWithDescount;