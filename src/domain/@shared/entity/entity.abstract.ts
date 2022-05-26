import Notification, { NotificationErrorProps } from "../notification/notification"

abstract class Entity {
  protected nofitication: Notification

  constructor() {
    this.nofitication = new Notification()
  }

  abstract hasErrors(): boolean;
  abstract getErrors(): NotificationErrorProps[];
}

export default Entity