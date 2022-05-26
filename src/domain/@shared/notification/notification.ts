type NotificationErrorProps = {
  message: string
  context: string 
}

class Notification {
  private _errors: NotificationErrorProps[] = []

  addError(error: NotificationErrorProps): void {
    this._errors.push(error)
  }

  messages(context?: string): string {
    const filterCtx = (error: NotificationErrorProps) => error.context === context
    const errors = (
      context ?
      this._errors.filter(filterCtx): this._errors
    )
    return errors
              .map(({context, message}) => `${context}: ${message}`)
              .join(', ')
  }

  get errors(): NotificationErrorProps[] {
    return [...this._errors]
  }
}

export { NotificationErrorProps }
export default Notification