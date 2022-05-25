import IEventHandler from "../../@shared/event/IEventHandler"
import ILogger from "../../@shared/logger/ILogger"
import CustomerCreatedEvent from "./customerCreatedEvent"

class CustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {
  private logger: ILogger

  constructor(logger: ILogger) {
    this.logger = logger
  }

  handle(event: CustomerCreatedEvent): void {
    this.logger.info(`Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: ${event.eventData}`)
  }
}

export default CustomerCreatedHandler