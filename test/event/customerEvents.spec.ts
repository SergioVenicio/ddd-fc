import BeforeCustomerIsCreated from "../../src/domain/customer/events/beforeCustomerIsCreatedHandler"
import CustomerCreatedEvent from "../../src/domain/customer/events/customerCreatedEvent"
import CustomerCreatedHandler from "../../src/domain/customer/events/customerCreatedHandler"
import EventDispatcher from "../../src/domain/@shared/event/eventDispatcher"
import Logger from "../../src/domain/@shared/logger/Logger"

describe('Customer event test cases', () => {
  it('should notify a new customer event', () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    }
    const eventDispatcher = new EventDispatcher(logger)
    const createHandler = new CustomerCreatedHandler(logger)
    const beforeCreateHandler = new BeforeCustomerIsCreated(logger)
    const eventName = 'CustomerCreated'

    const spyCreateHandler = jest.spyOn(createHandler, 'handle')
    const spyBeforeCreateHandler = jest.spyOn(beforeCreateHandler, 'handle')

    eventDispatcher.register(eventName, createHandler)
    eventDispatcher.register(eventName, beforeCreateHandler)

    const event = new CustomerCreatedEvent('CustomerCreated')
    eventDispatcher.notify(event)

    expect(spyCreateHandler).toBeCalledTimes(1)
    expect(spyBeforeCreateHandler).toBeCalledTimes(1)
  })
})