import { Sequelize } from "sequelize-typescript"
import NotificationError from "../../../../src/domain/@shared/notification/notification.error"
import Product from "../../../../src/domain/product/entity/product"
import ProductModel from "../../../../src/infrastructure/product/repository/sequelize/product.model"
import ProductRepository from "../../../../src/infrastructure/product/repository/sequelize/productRepository"
import UpdateProductUseCase from "../../../../src/usecase/product/update/update.product.usecase"


describe("test update product usecase", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository()
    const updateCustomerUseCase = new UpdateProductUseCase(productRepository)
    const customer = new Product(
      "123",
      "test",
      1.99
    )
    await productRepository.create(customer)

    const updateInput = {
      id: "123",
      name: "update Name",
      price: 2.99
    }
    await updateCustomerUseCase.execute(updateInput)
    const updatedCustomer = await productRepository.find(customer.id)
    expect(updatedCustomer.name).toBe("update Name")
    expect(updatedCustomer.price).toBe(2.99)
  })

  it("should not update a product with a invalid input", async () => {
    const productRepository = new ProductRepository()
    const updateCustomerUseCase = new UpdateProductUseCase(productRepository)
    const customer = new Product(
      "123",
      "test",
      1.99
    )
    await productRepository.create(customer)

    const updateInput = {
      id: "123",
      name: "update Name",
      price: 0
    }
    await expect(
      updateCustomerUseCase.execute(updateInput)
    ).rejects.toThrow(NotificationError)
  })
})