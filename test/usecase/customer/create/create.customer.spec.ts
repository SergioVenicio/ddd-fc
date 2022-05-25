import { Sequelize } from "sequelize-typescript"


import CreateUserUseCase from "../../../../src/usecase/customer/create/create.customer.usecase"

import CustomerModel from "../../../../src/infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../../src/infrastructure/customer/repository/sequelize/customerRepository"
import { RequiredParametersError } from "../../../../src/domain/@shared/errors/errors"


describe("test create customer usecase", () => {
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

  it("should create a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const customerRepository = new CustomerRepository(logger)
    const createUserUseCase = new CreateUserUseCase(customerRepository)
    const createInput = {
      name: "John Doe",
      address: {
        street: "test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    }
    const output = {
      ...createInput,
      id: expect.any(String)
    }
    
    await expect(
      createUserUseCase.execute(createInput)
    ).resolves.toStrictEqual(output)
  })

  it("should not create a customer with a required field", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const customerRepository = new CustomerRepository(logger)
    const createUserUseCase = new CreateUserUseCase(customerRepository)
    const createInput = {
      name: "",
      address: {
        street: "test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    }
    
    await expect(
      createUserUseCase.execute(createInput)
    ).rejects.toThrowError(RequiredParametersError)
  })
})