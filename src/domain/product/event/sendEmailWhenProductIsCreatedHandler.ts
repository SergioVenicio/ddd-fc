import IEventHandler from "../../@shared/event/IEventHandler";
import ProductCreatedEvent from "./productCreatedEvent";

class SendEmailWhenProductIsCreatedHandler implements IEventHandler<ProductCreatedEvent> {
  handle(event: ProductCreatedEvent): void {
    console.log(`Sending email to ${JSON.stringify(event.eventData)}...`);
  }
}

export default SendEmailWhenProductIsCreatedHandler;