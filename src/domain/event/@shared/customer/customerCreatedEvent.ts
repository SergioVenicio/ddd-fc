import IEvent from "../IEvent";

class CustomerCreatedEvent implements IEvent {
  dateTime: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dateTime = new Date();
    this.eventData = eventData;
  }
}

export default CustomerCreatedEvent;