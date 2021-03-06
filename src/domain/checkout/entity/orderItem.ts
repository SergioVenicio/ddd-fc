import Entity from "../../@shared/entity/entity.abstract"
import { RequiredParametersError } from "../../@shared/errors/errors"
import { NotificationErrorProps } from "../../@shared/notification/notification"
import IOrderItem from "./IOrderItem"

class OrderItem extends Entity implements IOrderItem {
  private _id: string
  private _name: string
  private _quantity: number
  private _price: number
  private _productId: string

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    super()

    this._id = String(id)
    this._name = String(name)
    this._price = Number(price)
    this._productId = String(productId)
    this._quantity = Number(quantity)

    this.validate()
  }

  public get id(): string {
    return String(this._id)
  }

  public get name(): string {
    return String(this._name)
  }

  public get quantity(): number {
    return Number(this._quantity)
  }

  public get productId(): string {
    return String(this._productId)
  }

  public get price(): number {
    return Number(this._price)
  }

  private validate(): void {
    if (!(this?.id)) {
      this.notification.addError({
        message: 'Id parameter is required!',
        context: 'order'
      })
    }
    if (!(this?.name)) {
      this.notification.addError({
        message: 'Name parameter is required!',
        context: 'order'
      })
    }
    if (!(this?.quantity)) {
      this.notification.addError({
        message: 'Quantity parameter is required!',
        context: 'order'
      })
    }
    if (!(this?.price)) {
      this.notification.addError({
        message: 'Price parameter is required!',
        context: 'order'
      })
    }
    if (!(this?.productId)) {
      this.notification.addError({
        message: 'ProductId parameter is required!',
        context: 'order'
      })
    }
  }

  hasErrors(): boolean {
    return this.notification.errors.length > 0
  }
  getErrors(): NotificationErrorProps[] {
    return this.notification.errors
  }
}

export default OrderItem