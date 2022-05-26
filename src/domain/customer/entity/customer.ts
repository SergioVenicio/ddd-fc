import Address from './address'

import ICustomer from './ICustomer'
import Entity from '../../@shared/entity/entity.abstract'
import { NotificationErrorProps } from '../../@shared/notification/notification'


class Customer extends Entity implements ICustomer {
  private _id: string
  private _name: string
  private _address: Address
  private _active: boolean
  private _rewardsPoints: number

  constructor(id: string, name: string, address: Address) {
    super()

    this._id = String(id)
    this._name = String(name)
    this._address = address
    this._active = false
    this._rewardsPoints = 0

    this.validate()
  }

  public get id(): string {
    return String(this._id)
  }

  public get name(): string {
    return String(this._name)
  }

  public get address(): Address {
    return this._address
  }

  public get active(): boolean {
    return Boolean(this._active)
  }

  public isActive(): boolean {
    return this._active
  }

  public activate(): void {
    this._active = true
  }

  public deactivate(): void {
    this._active = false
  }

  public addRewardPoints(points: number) {
    this._rewardsPoints = this._rewardsPoints + points
  }

  public get rewardPoints(): number {
    return Number(this._rewardsPoints)
  }

  private validate(): void {
    if (!(this?.id)) {
      this.nofitication.addError({
        message: 'Id is requred!',
        context: 'customer'
      })
    }
    if (!(this?.name)) {
      this.nofitication.addError({
        message: 'Name is requred!',
        context: 'customer'
      })
    }
  }

  public hasErrors(): boolean {
    return this.nofitication.messages().length > 0
  }

  public getErrors(): NotificationErrorProps[] {
    return this.nofitication.errors;
  }
}

export default Customer