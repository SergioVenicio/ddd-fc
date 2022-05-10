import { RequiredParametersError } from "../../errors/errors";

class Address {
  public readonly street: string;
  public readonly number: number;
  public readonly city: string;
  public readonly state: string;
  public readonly zipCode: string;

  constructor(street: string, number: number, city: string, state: string, zipCode: string) {
    this.street = String(street);
    this.number = Number(number);
    this.city = String(city);
    this.state = String(state);
    this.zipCode = String(zipCode);

    this.validate();
  }

  private validate() {
    if (!(this?.street)) {
      throw new RequiredParametersError("Street is required!");
    }
    if (!(this?.number)) {
      throw new RequiredParametersError("Number is required!");
    }
    if (!(this?.city)) {
      throw new RequiredParametersError("City is required!");
    }
    if (!(this?.state)) {
      throw new RequiredParametersError("State is required!");
    }
    if (!(this?.zipCode)) {
      throw new RequiredParametersError("Zip Code is required!");
    }
  }
}

export default Address;