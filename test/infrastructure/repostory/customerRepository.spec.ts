import { Sequelize } from "sequelize-typescript";
import Address from "../../../src/domain/customer/entity/address";
import Customer from "../../../src/domain/customer/entity/customer";
import { CustomerNotFoundError } from "../../../src/domain/@shared/errors/errors";
import CustomerModel from "../../../src/infrastructure/customer/repository/sequelize/customer.model";

import CustomerRepository from "../../../src/infrastructure/customer/repository/sequelize/customerRepository";
import Logger from "../../../src/domain/@shared/logger/Logger";

describe("ProductRepository test cases", () => {
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

  it("should create a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const address =  new Address("str 1", 123, "test", "TST", '123-321');
    const customer = new Customer("1", "test", address);
    await customerRepository.create(customer);

    const productModel = await CustomerModel.findOne({ where: {id : "1"}});
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'test',
      active: false,
      street: 'str 1',
      number: 123,
      city: 'test',
      state: 'TST',
      zipCode: '123-321',
      rewardPoints: 0
    });
  });

  it("should update a customer", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const address =  new Address("str 2", 123, "test 2", "TST", '123-321');
    const customer = new Customer("1", "test", address);
    await customerRepository.create(customer);

    customer.addRewardPoints(100);
    customer.activate()
    await customerRepository.update(customer);

    const productModel = await CustomerModel.findOne({ where: {id : "1"}});
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'test',
      active: true,
      street: 'str 2',
      number: 123,
      city: 'test 2',
      state: 'TST',
      zipCode: '123-321',
      rewardPoints: 100
    });
  });

  it("should find a customer by id", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const address =  new Address("str 2", 123, "test 2", "TST", '123-321');
    const customer = new Customer("1", "test", address);
    await customerRepository.create(customer);

    const findedCustomer = await customerRepository.find("1");

    expect(findedCustomer.id).toBe("1");
    expect(findedCustomer.name).toBe("test");
    expect(findedCustomer.address.number).toBe(123);
  });

  it("should throws CustomerNotFound with a invalid id", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const address =  new Address("str 2", 123, "test 2", "TST", '123-321');
    const customer = new Customer("1", "test", address);
    await customerRepository.create(customer);

    await expect(customerRepository.find("10")).rejects.toThrowError(CustomerNotFoundError)
  });

  it("should find all customers", async () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const customerRepository = new CustomerRepository(logger);
    const address =  new Address("str 1", 123, "test 1", "TST", '123-321');
    const customer = new Customer("1", "test", address);
    await customerRepository.create(customer);

    const address2 =  new Address("str 2", 123, "test 2", "TST", '123-321');
    const customer2 = new Customer("2", "test", address2);
    await customerRepository.create(customer2);

    const customers = await  customerRepository.findAll();
    expect(customers.length).toBe(2)
    expect(customers[0].id).toBe("1")
    expect(customers[1].id).toBe("2")
  });
});