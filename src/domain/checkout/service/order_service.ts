import { v4 as uuid } from 'uuid'

import Customer from "../../customer/entity/customer"
import Order from "../entity/order"
import OrderItem from "../entity/orderItem"
import { ParameterValueError } from "../../@shared/errors/errors"

class OrderService {
  public static GetTotalOrders(orders: Order[]): number {
    return orders.reduce((total, order) => {
      return total + order.total
    }, 0)
  }

  public static PlaceOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new ParameterValueError("Order must have at least one item")
    }

    const orderId = uuid()
    const order = new Order(String(orderId), customer.id, items)
    customer.addRewardPoints(Math.round(order.total * 0.1))
    return order
  }
}

export default OrderService