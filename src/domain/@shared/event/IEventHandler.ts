import IEvent from "./IEvent";

interface IEventHandler<T extends IEvent=IEvent> {
  handle(event: T): void;
}

export default IEventHandler;