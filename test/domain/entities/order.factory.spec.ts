import { v4 } from "uuid";
import OrderFactory from "../../../src/domain/checkout/factory/order.factory";

describe("OrderFactory test cases", () => {
  it("should create an order", () => {
    const orderProps = {
      id: v4(),
      customerId: v4(),
      items: [
        {
          id: v4(),
          name: "Product 1",
          productId: v4(),
          quantity: 1,
          price: 1.99
        }
      ]
    }
    const order = OrderFactory.Create(orderProps);

    expect(order.id).toBeDefined();
    expect(order.customerId).toEqual(orderProps.customerId);
    expect(order.items.length).toBe(1);
    expect(order.items[0].name).toEqual("Product 1");
  });
});