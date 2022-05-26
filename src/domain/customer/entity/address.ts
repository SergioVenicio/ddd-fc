import Entity from "../../@shared/entity/entity.abstract"
import { NotificationErrorProps } from "../../@shared/notification/notification"
import AddressValidatorFactory from "../factory/addressValidator.factory"
import IAddress from "./IAddress"

class Address extends Entity implements IAddress {
  public readonly _street: string
  public readonly _number: number
  public readonly _city: string
  public readonly _state: string
  public readonly _zipCode: string

  constructor(street: string, number: number, city: string, state: string, zipCode: string) {
    super()

    this._street = String(street)
    this._number = Number(number)
    this._city = String(city)
    this._state = String(state)
    this._zipCode = String(zipCode)

    this.validate()
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipCode(): string {
    return this._zipCode
  }

  hasErrors(): boolean {
    return this.notification.errors.length > 0
  }
  getErrors(): NotificationErrorProps[] {
    return this.notification.errors
  }

  private validate() {
    AddressValidatorFactory.create().validate(this)
  }
}

export default Address