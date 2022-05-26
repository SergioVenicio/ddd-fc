import Entity from "../../@shared/entity/entity.abstract"
import Notification, { NotificationErrorProps } from "../../@shared/notification/notification"
import ProductValidatorFactory from "../factory/productValidator.factory"
import IProduct from "./IProduct"

class Product extends Entity implements IProduct {
  private readonly _id: string
  private _name: string
  private _price: number
  public notification: Notification = new Notification()

  constructor(id: string, name: string, price: number) {
    super()

    this._id = String(id)
    this._name = String(name)
    this._price = Number(price)

    this.validate()
  }

  public get id(): string {
    return String(this._id)
  }

  public get name(): string {
    return String(this._name)
  }

  public get price(): number {
    return Number(this._price)
  }

  public changePrice(price: number): void {
    if (price <= 0) {
      this.notification.addError({
        message: 'Price field must be greter than 0',
        context: 'product'
      })
    }
    this._price = Number(price)
  }

  private validate(): void {
    ProductValidatorFactory.create().validate(this)
  }

  hasErrors(): boolean {
    return this.notification.messages().length > 0
  }
  getErrors(): NotificationErrorProps[] {
    return this.notification.errors
  }
}

export default Product