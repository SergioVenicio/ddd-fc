import Order from "../../../src/domain/checkout/entity/order"
import OrderItem from "../../../src/domain/checkout/entity/orderItem"
import Product from "../../../src/domain/product/entity/product"

describe('Order test cases', () => {
  it("should create new OrderItem", () => {
    const product = new Product("1", "test", 1.99)
    const item = new OrderItem("1", "test", product.price, product.id, 1)

    expect(item.name).toBe("test")
    expect(item.quantity).toBe(1)
    expect(item.price).toBe(1.99)
  })

  it("should not create new OrderItem without required fields", () => {
    const product = new Product("1", "test", 1.99)
    const item = new OrderItem("", "test", product.price, product.id, 1)
    expect(item.hasErrors()).toBe(true)
  })

  it("shuld create new Order", () => {
    const product = new Product("1", "test", 1.99)
    const product2 = new Product("2", "test", 2.99)
    const items = [
      new OrderItem("1", "test", product.price, product.id, 2),
      new OrderItem("2", "test 2", product2.price, product.id, 2),
    ]
    const order = new Order("123", "1", items)
    expect(order.id).toBe("123")
    expect(order.customerId).toBe("1")
    expect(order.items).toStrictEqual(items)
    expect(Math.round(order.total)).toBe(10)
  })

  it("should not create new Order without required fields", () => {
    const product = new Product("1", "test", 1.99)
    const items = [new OrderItem("1", "test", product.price, product.id, 1)]
    const order = new Order("", "1", items)
    expect(order.hasErrors()).toBe(true)
  })
})