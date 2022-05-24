import IProductRepository from "../../../domain/product/repository/IProductRepository";
import { FindCustomerDTO, FindCustomerResponseDTO } from "./find.product.dto";

class FindProductUseCase {
  private repository: IProductRepository;

  constructor(repository: IProductRepository) {
    this.repository = repository;
  }

  async execute(input: FindCustomerDTO): Promise<FindCustomerResponseDTO> {
    const product = await this.repository.find(input.id);
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}

export default FindProductUseCase;