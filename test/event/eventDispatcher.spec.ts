import Product from "../../src/domain/product/entity/product";
import EventDispatcher from "../../src/domain/@shared/event/eventDispatcher";
import ProductCreatedEvent from "../../src/domain/product/event/productCreatedEvent";
import SendEmailWhenProductIsCreatedHandler from "../../src/domain/product/event/sendEmailWhenProductIsCreatedHandler";
import Logger from "../../src/domain/@shared/logger/Logger";


describe('Domain event test cases', () => {
  it('should register a new event handler', () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };

    const eventDispatcher = new EventDispatcher(logger);
    const eventHandler = new SendEmailWhenProductIsCreatedHandler(logger);
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    expect(eventDispatcher.getEventHandlers[eventName]).toBeDefined();
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(1);
    expect(eventDispatcher.getEventHandlers[eventName][0]).toMatchObject(eventHandler);
  });

  it('should unregister a event handler', () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const eventDispatcher = new EventDispatcher(logger);
    const eventHandler = new SendEmailWhenProductIsCreatedHandler(logger);
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.unregister(eventName, eventHandler);
    expect(eventDispatcher.getEventHandlers[eventName].length).toBe(0);
  });

  it('should unregister all handlers', () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const eventDispatcher = new EventDispatcher(logger);
    const eventHandler = new SendEmailWhenProductIsCreatedHandler(logger);
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers[eventName]).toBeUndefined();
  });

  it('should notify handlers', () => {
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const eventDispatcher = new EventDispatcher(logger);
    const eventHandler = new SendEmailWhenProductIsCreatedHandler(logger);
    const spyHandler =  jest.spyOn(eventHandler, 'handle');
    const eventName = 'ProductCreatedEvent';

    eventDispatcher.register(eventName, eventHandler);

    const product = new Product('1', 'test', 1.99);
    const event = new ProductCreatedEvent({
      email: 'test@test.com',
      product
    });

    eventDispatcher.notify(event);
    expect(spyHandler).toBeCalledTimes(1);
  });
});