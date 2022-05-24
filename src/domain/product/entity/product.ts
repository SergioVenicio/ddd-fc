import { PriceError, RequiredParametersError } from "../../@shared/errors/errors";
import IProduct from "./IProduct";

class Product implements IProduct {
  private readonly _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
      this._id = String(id);
      this._name = String(name);
      this._price = Number(price);

      this.validate();
    }

    public get id(): string {
      return String(this._id);
    }

    public get name(): string {
      return String(this._name);
    }

    public get price(): number {
      return Number(this._price);
    }

    public changePrice(price: number): void {
      if (price <= 0) {
        throw new PriceError("Price field must be greter than 0");
      }
      this._price = Number(price);
    }

    private validate(): void {
      if (!(this?.id)) {
        throw new RequiredParametersError("Id parameter is required!")
      }
      if (!(this?.name)) {
        throw new RequiredParametersError("Name parameter is required!")
    }
    if (!(this?.price)) {
      throw new RequiredParametersError("Price parameter is required!")
    }
  }
}

export default Product;