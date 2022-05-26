import { NotificationErrorProps } from "./notification"


class NotificationError extends Error {
  public errors: NotificationErrorProps[]

  constructor(errors: NotificationErrorProps[]) {
    super()
    this.errors = errors
  }

  get message(): string {
    return this.errors.map(error => error.message).join(', ')
  }
}

export default NotificationError