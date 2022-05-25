import { Sequelize } from "sequelize-typescript"
import { RequiredParametersError } from "../../../../src/domain/@shared/errors/errors"
import Address from "../../../../src/domain/customer/entity/address"
import Customer from "../../../../src/domain/customer/entity/customer"
import CustomerModel from "../../../../src/infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../../src/infrastructure/customer/repository/sequelize/customerRepository"
import UpdateCustomerUseCase from "../../../../src/usecase/customer/update/update.customer.usecase"


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

  it("should update a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const customerRepository = new CustomerRepository(logger)
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
    const customer = new Customer(
      "123",
      "John Doe",
      new Address("test", 123, "test", "TS", "1234-543")
    )
    await customerRepository.create(customer)

    const updateInput = {
      id: "123",
      name: "update Name",
      address: {
        street: "update - test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    }
    await updateCustomerUseCase.execute(updateInput)
    const updatedCustomer = await customerRepository.find(customer.id)
    expect(updatedCustomer.name).toBe("update Name")
    expect(updatedCustomer.address.street).toBe("update - test")
  })

  it("should not update a customer with a invalid input", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const customerRepository = new CustomerRepository(logger)
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository)
    const customer = new Customer(
      "123",
      "John Doe",
      new Address("test", 123, "test", "TS", "1234-543")
    )
    await customerRepository.create(customer)

    const updateInput = {
      id: "123",
      name: "",
      address: {
        street: "update - test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    }
    await expect(
      updateCustomerUseCase.execute(updateInput)
    ).rejects.toThrow(RequiredParametersError)
  })
})