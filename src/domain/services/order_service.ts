import { v4 as uuid } from 'uuid';

import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/orderItem";
import { ParameterValueError } from "../../errors/errors";

class OrderService {
  public static GetTotalOrders(orders: Order[]): number {
    return orders.reduce((total, order) => {
      return total + order.total
    }, 0)
  }

  public static PlaceOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new ParameterValueError("Order must have at least one item");
    }

    const orderId = uuid();
    const order = new Order(String(orderId), customer.id, items);
    customer.addRewardPoints(Math.round(order.total * 0.1));
    return order;
  }
}

export default OrderService