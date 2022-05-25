import { RequiredParametersError } from "../../@shared/errors/errors"
import IAddress from "./IAddress"

class Address implements IAddress {
  public readonly _street: string
  public readonly _number: number
  public readonly _city: string
  public readonly _state: string
  public readonly _zipCode: string

  constructor(street: string, number: number, city: string, state: string, zipCode: string) {
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

  private validate() {
    if (!(this?._street)) {
      throw new RequiredParametersError("Street is required!")
    }
    if (!(this?._number)) {
      throw new RequiredParametersError("Number is required!")
    }
    if (!(this?._city)) {
      throw new RequiredParametersError("City is required!")
    }
    if (!(this?._state)) {
      throw new RequiredParametersError("State is required!")
    }
    if (!(this?._zipCode)) {
      throw new RequiredParametersError("Zip Code is required!")
    }
  }
}

export default Address