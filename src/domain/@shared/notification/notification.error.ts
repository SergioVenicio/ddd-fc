import { NotificationErrorProps } from "./notification"


class NotificationError extends Error {
  public errors: NotificationErrorProps[]

  constructor(errors: NotificationErrorProps[]) {
    super()
  }
}

export default NotificationError