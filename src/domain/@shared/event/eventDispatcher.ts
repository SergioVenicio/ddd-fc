import ILogger from "../logger/ILogger";
import IEvent from "./IEvent";
import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";

class EventDispatcher implements IEventDispatcher {
  private eventHandlers: {[eventName: string]: IEventHandler[]};
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.eventHandlers = {};
    this.logger = logger;
  }

  notify(event: IEvent): void {
    Object.entries(this.eventHandlers).map(([eventName, eventHandlers]) => {
      eventHandlers.map(eventHandler => {
        this.logger.info(`Notifying: ${eventName}...`);
        eventHandler.handle(event);
      });
    });
  }
  register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    if (!(this.eventHandlers[eventName])) {
      this.eventHandlers[eventName] = [eventHandler];
      return;
    }

    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
    const handlers = this.eventHandlers[eventName];
    const newHandlers = handlers.filter(handler => handler !== eventHandler);
    this.eventHandlers[eventName] = newHandlers;
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }

  get getEventHandlers(): {[eventName: string]: IEventHandler[]} {
    return this.eventHandlers;
  }
}

export default EventDispatcher;