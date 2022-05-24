import Address from './address';

import {RequiredParametersError} from '../../@shared/errors/errors';
import ICustomer from './ICustomer';


class Customer implements ICustomer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean;
  private _rewardsPoints: number;

  constructor(id: string, name: string, address: Address) {
    this._id = String(id);
    this._name = String(name);
    this._address = address;
    this._active = false;
    this._rewardsPoints = 0;

    this.validate();
  }

  public get id(): string {
    return String(this._id);
  }

  public get name(): string {
    return String(this._name);
  }

  public get address(): Address {
    return this._address;
  }

  public get active(): boolean {
    return Boolean(this._active);
  }

  public isActive(): boolean {
    return this._active;
  }

  public activate(): void {
    this._active = true;
  }

  public deactivate(): void {
    this._active = false;
  }

  public addRewardPoints(points: number) {
    this._rewardsPoints = this._rewardsPoints + points;
  }

  public get rewardPoints(): number {
    return Number(this._rewardsPoints);
  }

  private validate(): void {
    if (!(this?.id)) {
      throw new RequiredParametersError("Id is required!");
    }
    if (!(this?.name)) {
      throw new RequiredParametersError("Name is required!");
    }
  }
}

export default Customer;