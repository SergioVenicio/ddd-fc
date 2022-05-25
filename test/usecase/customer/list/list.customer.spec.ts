import { Sequelize } from "sequelize-typescript"
import Address from "../../../../src/domain/customer/entity/address"
import Customer from "../../../../src/domain/customer/entity/customer"
import CustomerModel from "../../../../src/infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../../src/infrastructure/customer/repository/sequelize/customerRepository"
import ListCustomerUseCase from "../../../../src/usecase/customer/list/list.customer.usecase"


describe("test update customer usecase", () => {
  let squeleze: Sequelize

  beforeEach(async () => {
    squeleze =  new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    })

    squeleze.addModels([CustomerModel])
    await squeleze.sync()
  })

  afterEach(async () => {
    await squeleze.close()
  })

  it("should get a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const customerRepository = new CustomerRepository(logger)
    const updateCustomerUseCase = new ListCustomerUseCase(customerRepository)
    const customer = new Customer(
      "123",
      "John Doe",
      new Address("test", 123, "test", "TS", "1234-543")
    )
    await customerRepository.create(customer)
    const { customers } = await updateCustomerUseCase.execute()
    expect(customers).toEqual([{
      id: "123",
      name: "John Doe",
      address: {
        street: "test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    }])
  })
})