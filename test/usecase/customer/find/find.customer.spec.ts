import { Sequelize } from "sequelize-typescript";


import Address from "../../../../src/domain/customer/entity/address";
import Customer from "../../../../src/domain/customer/entity/customer";

import FindCustomerUseCase from "../../../../src/usecase/customer/find/find.customer.usecase";

import CustomerModel from "../../../../src/infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../../src/infrastructure/customer/repository/sequelize/customerRepository";
import { CustomerNotFoundError } from "../../../../src/domain/@shared/errors/errors";


describe("test find customer usecase", () => {
  let squeleze: Sequelize;

  beforeEach(async () => {
    squeleze =  new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });

    squeleze.addModels([CustomerModel]);
    await squeleze.sync();
  });

  afterEach(async () => {
    await squeleze.close();
  });

  it("should find a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const customer = new Customer(
      "123",
      "John Doe",
      new Address("test", 123, "test", "TS", "1234-543")
    );

    await customerRepository.create(customer);

    const findInput = {
      id: "123"
    };

    const response = await findCustomerUseCase.execute(findInput);
    expect(response).toStrictEqual({
      id: "123",
      name: "John Doe",
      address: {
        street: "test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    })
  })


  it("should not find a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const findInput = {
      id: "123"
    };

    await expect(
      findCustomerUseCase.execute(findInput)
    ).rejects.toThrow(CustomerNotFoundError);
  })
})