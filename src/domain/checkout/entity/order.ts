import IOrder from "./IOrder";
import IOrderItem from "./IOrderItem";
import Entity from "../../@shared/entity/entity.abstract";
import { NotificationErrorProps } from "../../@shared/notification/notification";
import OrderItem from "./orderItem";

class Order extends Entity implements IOrder {
  private readonly _id: string;
  private _customerId: string;
  private _items: IOrderItem[];

  constructor(id: string, customerId: string, items: IOrderItem[]) {
    super();

    this._id = String(id);
    this._customerId = String(customerId);
    this._items = [...items];

    this.validate();
  }

  public get id(): string {
    console.log("ID", String(this._id) == "");
    return String(this._id);
  }

  public get customerId(): string {
    return String(this._customerId);
  }

  public get items(): IOrderItem[] {
    return [...this._items];
  }

  public addItem(item: OrderItem): void {
    this._items.push(item);
  }

  public get total(): number {
    return this._items.reduce((total, item) => {
      return Number(total + item.price * item.quantity);
    }, 0);
  }

  private validate(): void {
    if (this.id == "") {
      this.notification.addError({
        message: "Id parameter is required!",
        context: "order",
      });
    }
    if (!this?.customerId) {
      this.notification.addError({
        message: "CustomerId parameter is required!!",
        context: "order",
      });
    }
    if (this.items?.length <= 0) {
      this.notification.addError({
        message: "Items parameter is required!",
        context: "order",
      });
    }
  }

  hasErrors(): boolean {
    return this.notification.errors.length > 0;
  }
  getErrors(): NotificationErrorProps[] {
    return this.notification.errors;
  }
}

export default Order;
