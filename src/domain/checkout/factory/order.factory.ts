import IOrder from "../entity/IOrder";
import Order from "../entity/order";

import {v4} from "uuid";

interface OrderCreateProps {
  customerId: string,
  items: {
    id: string,
    name: string,
    productId: string,
    quantity: number,
    price: number
  }[]
}
class OrderFactory {
  public static Create(orderProps: OrderCreateProps): IOrder {
    const id = v4();
    return new Order(
      id,
      orderProps.customerId,
      orderProps.items
    );
  }
}

export default OrderFactory;