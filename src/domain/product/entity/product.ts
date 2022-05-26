import Entity from "../../@shared/entity/entity.abstract"
import { NotificationErrorProps } from "../../@shared/notification/notification"
import IProduct from "./IProduct"

class Product extends Entity implements IProduct {
  private readonly _id: string
  private _name: string
  private _price: number

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
        this.nofitication.addError({
          message: 'Price field must be greter than 0',
          context: 'product'
        })
      }
      this._price = Number(price)
    }

    private validate(): void {
      if (!(this?.id)) {
        this.nofitication.addError({
          message: 'Id parameter is required!',
          context: 'product'
        })
      }
      if (!(this?.name)) {
        this.nofitication.addError({
          message: 'Name parameter is required!',
          context: 'product'
        })
    }
    if (!(this?.price)) {
      this.nofitication.addError({
        message: 'Price parameter is required!',
        context: 'product'
      })
    }
  }

  hasErrors(): boolean {
    return this.nofitication.messages().length > 0
  }
  getErrors(): NotificationErrorProps[] {
    return this.nofitication.errors
  }
}

export default Product