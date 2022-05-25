import IEventHandler from "../../@shared/event/IEventHandler"
import ILogger from "../../@shared/logger/ILogger"
import CustomerCreatedEvent from "./customerCreatedEvent"

class BeforeCustomerIsCreated implements IEventHandler<CustomerCreatedEvent> {
  private logger: ILogger

  constructor(logger: ILogger) {
    this.logger = logger
  }

  handle(event: CustomerCreatedEvent): void {
    this.logger.info(`Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: ${event.eventData}`)
  }
}

export default BeforeCustomerIsCreated