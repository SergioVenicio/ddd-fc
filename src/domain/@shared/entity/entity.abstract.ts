import Notification, { NotificationErrorProps } from "../notification/notification"

abstract class Entity {
  public notification: Notification

  constructor() {
    this.notification = new Notification()
  }

  abstract hasErrors(): boolean;
  abstract getErrors(): NotificationErrorProps[];
}

export default Entity