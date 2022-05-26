import { Sequelize } from "sequelize-typescript"
import NotificationError from "../../../../src/domain/@shared/notification/notification.error"
import ProductModel from "../../../../src/infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../../src/infrastructure/product/repository/sequelize/productRepository"
import CreateProductUseCase from "../../../../src/usecase/product/create/create.product.usecase"


describe("test create customer usecase", () => {
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

  it("should create a product", async () => {

    const productRepository = new ProductRepository()
    const createProducUseCase = new CreateProductUseCase(productRepository)
    const createInput = {
      name: "test",
      price: 1.99
    }
    const output = {
      ...createInput,
      id: expect.any(String)
    }
    
    await expect(
      createProducUseCase.execute(createInput)
    ).resolves.toStrictEqual(output)
  })

  it("should not create a product with a required field", async () => {
    const productRepository = new ProductRepository()
    const createProducUseCase = new CreateProductUseCase(productRepository)
    const createInput = {
      name: "test",
      price: 0
    }
    
    await expect(
      createProducUseCase.execute(createInput)
    ).rejects.toThrowError(NotificationError)
  })
})