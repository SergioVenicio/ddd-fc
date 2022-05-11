import Address from "../../domain/entities/address";
import Customer from "../../domain/entities/customer";
import BeforeCustomerIsCreated from "../../domain/event/@shared/customer/beforeCustomerIsCreatedHandler";
import CustomerCreatedEvent from "../../domain/event/@shared/customer/customerCreatedEvent";
import CustomerCreatedHandler from "../../domain/event/@shared/customer/customerCreatedHandler";
import EventDispatcher from "../../domain/event/@shared/eventDispatcher";
import IEventDispatcher from "../../domain/event/@shared/IEventDispatcher";
import ICustomerRepository from "../../domain/repository/ICustomerRepository";
import { CustomerNotFoundError } from "../../errors/errors";
import CustomerModel from "../db/sequelize/model/customer.model";

class CustomerRepository implements ICustomerRepository {
  private eventDispatcher: IEventDispatcher;

  constructor() {
    this.eventDispatcher = new EventDispatcher();

    const createHandler = new CustomerCreatedHandler();
    const beforeCreateHandler = new BeforeCustomerIsCreated();
    const eventName = 'CustomerCreated';

    this.eventDispatcher.register(eventName, createHandler);
    this.eventDispatcher.register(eventName, beforeCreateHandler);
  }
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.active,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      state: entity.address.state,
      zipCode: entity.address.zipCode,
      rewardPoints: entity.rewardPoints,
    });


    const event = new CustomerCreatedEvent('CustomerCreated');
    this.eventDispatcher.notify(event);
  }

  async update(entity: Customer): Promise<void> {
    const updateCustomer = {
      name: entity.name,
      active: entity.active,
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      state: entity.address.state,
      zipCode: entity.address.zipCode,
      rewardPoints: entity.rewardPoints,
    };
    await CustomerModel.update(
      {...updateCustomer},
      {where: {id: entity.id}}
    )
  }
  async find(id: string): Promise<Customer> {
    const customer = await CustomerModel.findOne({
      where: {id}
    });

    if (!(customer)) {
      throw new CustomerNotFoundError(`Customer ${id} not found!`);
    }

    const address = new Address(
      customer.street,
      customer.number,
      customer.city,
      customer.state,
      customer.zipCode
    );

    return new Customer(
      customer.id,
      customer.name,
      address
    );
  }
  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();
    return customers.map(c => {
      const addr = new Address(
        c.street,
        c.number,
        c.city,
        c.state,
        c.zipCode
      );

      return new Customer(c.id, c.name, addr);
    });
  }

}

export default CustomerRepository;