import OrderItem from "./orderItem";

import { RequiredParametersError } from "../../errors/errors";


class Order {
  private readonly _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = String(id);
    this._customerId = String(customerId);
    this._items = [...items];

    this.validate();
  }

  public get id(): string {
    return String(this._id);
  }

  public get customerId(): string {
    return String(this._customerId);
  }

  public get items(): OrderItem[] {
    return [...this._items];
  }

  public get total(): number {
    return this._items.reduce((total, item) => {
      return Number(total + (item.price * item.quantity));
    }, 0);
  }

  private validate(): void {
    if (!(this?.id)) {
      throw new RequiredParametersError("Id parameter is required!")
    }
    if (!(this?.customerId)) {
      throw new RequiredParametersError("CustomerId parameter is required!")
    }
    if (this.items?.length <= 0) {
      throw new RequiredParametersError("Items parameter is required!")
    }
  }
}

export default Order;