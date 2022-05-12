import Address from "../../../src/domain/customer/entity/address";
import Customer from "../../../src/domain/customer/entity/customer";
import Order from "../../../src/domain/checkout/entity/order";
import OrderItem from "../../../src/domain/checkout/entity/orderItem";
import OrderService from "../../../src/domain/checkout/service/order_service";

import { ParameterValueError } from "../../../src/domain/@shared/errors/errors";

describe("OrderService test cases", () => {
  it("should get total orders", () => {
    const items =  [
      new OrderItem("1", "p1", 3.59, "1", 3),
      new OrderItem("2", "p2", 1.99, "2", 100)
    ];

    const orders = [
      new Order("1", "1", items),
      new Order("2", "2", items)
    ];

    const total = OrderService.GetTotalOrders(orders);
    expect(total).toBe(419.54);
  });

  it("should add customer rewards after order", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321");
    const customer = new Customer("1", "test", customerAddr);

    const item = new OrderItem('1', "p1", 1, customer.id, 100);
    const order = OrderService.PlaceOrder(customer, [item]);

    expect(customer.rewardPoints).toBe(10);
    expect(order.total).toBe(100);
  });

  it("should not add customer rewards after order", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321");
    const customer = new Customer("1", "test", customerAddr);
    expect(() => {
      OrderService.PlaceOrder(customer, []);
    }).toThrow(ParameterValueError)
  });
})