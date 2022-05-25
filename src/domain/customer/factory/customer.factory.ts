
import {v4} from "uuid"
import Address from "../entity/address"
import Customer from "../entity/customer"
import ICustomer from "../entity/ICustomer"

class CustomerFactory {
  public static Create(name: string, street: string, number: number, city: string, state: string, zipCode: string): ICustomer {
    const id = v4()

    const address = new Address(street, number, city, state, zipCode)
    return new Customer(id, name, address)
  }
}

export default CustomerFactory