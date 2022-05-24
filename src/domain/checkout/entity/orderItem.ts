import { RequiredParametersError } from "../../@shared/errors/errors";
import IOrderItem from "./IOrderItem";

class OrderItem implements IOrderItem {
  private _id: string;
  private _name: string;
  private _quantity: number;
  private _price: number;
  private _productId: string;

  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = String(id);
    this._name = String(name);
    this._price = Number(price);
    this._productId = String(productId);
    this._quantity = Number(quantity);

    this.validate();
  }

  public get id(): string {
    return String(this._id);
  }

  public get name(): string {
    return String(this._name);
  }

  public get quantity(): number {
    return Number(this._quantity);
  }

  public get productId(): string {
    return String(this._productId);
  }

  public get price(): number {
    return Number(this._price);
  }

  private validate(): void {
    if (!(this?.id)) {
      throw new RequiredParametersError("Id parameter is required!")
    }
    if (!(this?.name)) {
      throw new RequiredParametersError("Name parameter is required!")
    }
    if (!(this?.quantity)) {
      throw new RequiredParametersError("Quantity parameter is required!")
    }
    if (!(this?.price)) {
      throw new RequiredParametersError("Price parameter is required!")
    }
    if (!(this?.productId)) {
      throw new RequiredParametersError("ProductId parameter is required!")
    }
  }
}

export default OrderItem;