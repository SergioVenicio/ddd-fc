import IEvent from "../../@shared/event/IEvent"

class ProductCreatedEvent implements IEvent {
  dateTime: Date
  eventData: any

  constructor(eventData: any) {
    this.dateTime = new Date()
    this.eventData = eventData
  }
}

export default ProductCreatedEvent