import NotificationError from "../../../domain/@shared/notification/notification.error"
import Product from "../../../domain/product/entity/product"
import ProductFactory from "../../../domain/product/factory/product.factory"
import IProductRepository from "../../../domain/product/repository/IProductRepository"
import { CreateProductDTO, CreateProductResponseDTO } from "./create.product.dto"

class CreateProductUseCase {
  private repository: IProductRepository

  constructor(repository: IProductRepository) {
    this.repository = repository
  }

  async execute(input: CreateProductDTO): Promise<CreateProductResponseDTO> {
    const newProduct = ProductFactory.Create(input.name, input.price) as Product

    if (newProduct.hasErrors()) {
      throw new NotificationError(newProduct.getErrors())
    }
    await this.repository.create(newProduct)
    return {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price
    }
  }
}

export default CreateProductUseCase