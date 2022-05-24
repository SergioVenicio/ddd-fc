import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import BeforeCustomerIsCreated from "../../../../domain/customer/events/beforeCustomerIsCreatedHandler";
import CustomerCreatedEvent from "../../../../domain/customer/events/customerCreatedEvent";
import CustomerCreatedHandler from "../../../../domain/customer/events/customerCreatedHandler";
import EventDispatcher from "../../../../domain/@shared/event/eventDispatcher";
import IEventDispatcher from "../../../../domain/@shared/event/IEventDispatcher";
import ICustomerRepository from "../../../../domain/customer/repository/ICustomerRepository";
import { CustomerNotFoundError } from "../../../../domain/@shared/errors/errors";
import CustomerModel from "./customer.model";
import ILogger from "../../../../domain/@shared/logger/ILogger";

class CustomerRepository implements ICustomerRepository {
  private eventDispatcher: IEventDispatcher;

  constructor(logger: ILogger) {
    this.eventDispatcher = new EventDispatcher(logger);

    const createHandler = new CustomerCreatedHandler(logger);
    const beforeCreateHandler = new BeforeCustomerIsCreated(logger);
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