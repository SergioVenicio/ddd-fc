import IEventHandler from "../../@shared/event/IEventHandler"
import ILogger from "../../@shared/logger/ILogger"
import ProductCreatedEvent from "./productCreatedEvent"

class SendEmailWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
  private logger: ILogger

  constructor(logger: ILogger) {
    this.logger = logger
  }

  handle(event: ProductCreatedEvent): void {
    this.logger.info(`Sending email to ${JSON.stringify(event.eventData)}...`)
  }
}

export default SendEmailWhenProductIsCreatedHandler