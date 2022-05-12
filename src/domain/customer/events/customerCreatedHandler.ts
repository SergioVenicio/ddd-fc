import IEventHandler from "../../@shared/event/IEventHandler";
import CustomerCreatedEvent from "./customerCreatedEvent";

class CustomerCreatedHandler implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Handler1: EnviaConsoleLog1Handler. Mensagem: "Esse é o primeiro console.log do evento: ${event.eventData}`);
  }
}

export default CustomerCreatedHandler;