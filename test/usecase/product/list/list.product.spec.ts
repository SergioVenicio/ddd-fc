import { Sequelize } from "sequelize-typescript"
import Product from "../../../../src/domain/product/entity/product"
import ProductModel from "../../../../src/infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../../src/infrastructure/product/repository/sequelize/productRepository"
import ListProductUseCase from "../../../../src/usecase/product/list/list.product.usecase"

describe("test list product usecase", () => {
  let squeleze: Sequelize

  beforeEach(async () => {
    squeleze =  new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    })

    squeleze.addModels([ProductModel])
    await squeleze.sync()
  })

  afterEach(async () => {
    await squeleze.close()
  })

  it("should list products", async () => {
    const productRepository = new ProductRepository()
    const listProductUseCase = new ListProductUseCase(productRepository)
    const customer = new Product(
      "123",
      "test",
      1.99
    )
    await productRepository.create(customer)
    const { products } = await listProductUseCase.execute()
    expect(products).toEqual([{
      id: "123",
      name: "test",
      price: 1.99
    }])
  })
})