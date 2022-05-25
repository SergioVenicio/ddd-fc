import IEvent from "./IEvent"
import IEventHandler from "./IEventHandler"

interface IEventDispatcher {
  notify(event: IEvent): void
  register(eventName: string, eventHandler: IEventHandler): void
  unregister(eventName: string, eventHandler: IEventHandler): void
  unregisterAll(): void
}

export default IEventDispatcher