import Product from "../../../domain/product/entity/product";
import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { UpdateProductDTO, UpdateProductResponseDTO } from "./update.customer.dto";

class UpdateProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: UpdateProductDTO): Promise<UpdateProductResponseDTO> {
    const product = new Product(
      input.id,
      input.name,
      input.price
    )
    await this.repository.update(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}

export default UpdateProductUseCase;