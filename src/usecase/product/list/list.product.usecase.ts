import IProductRepository from "../../../domain/product/repository/IProductRepository"
import { ListProductResponseDTO } from "./list.product.dto"

class ListProductUseCase {
  private repository: IProductRepository

  constructor(repository: IProductRepository) {
    this.repository = repository
  }

  async execute(): Promise<ListProductResponseDTO> {
    const products = await this.repository.findAll()

    const response = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price
    }))

    return {
      products: response
    }
  }
}

export default ListProductUseCase