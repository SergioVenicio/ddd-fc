import IEventHandler from "../../@shared/event/IEventHandler";
import CustomerCreatedEvent from "./customerCreatedEvent";

class BeforeCustomerIsCreated implements IEventHandler<CustomerCreatedEvent> {
  handle(event: CustomerCreatedEvent): void {
    console.log(`Handler2: EnviaConsoleLog2Handler. Mensagem: "Esse é o segundo console.log do evento: ${event.eventData}`);
  }
}

export default BeforeCustomerIsCreated;