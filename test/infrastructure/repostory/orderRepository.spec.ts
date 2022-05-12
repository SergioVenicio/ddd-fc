import { Sequelize } from "sequelize-typescript";
import Address from "../../../src/domain/customer/entity/address";
import Customer from "../../../src/domain/customer/entity/customer";
import Order from "../../../src/domain/checkout/entity/order";
import OrderItem from "../../../src/domain/checkout/entity/orderItem";
import Product from "../../../src/domain/product/entity/product";
import { OrderNotFoundError } from "../../../src/domain/@shared/errors/errors";

import CustomerModel from "../../../src/infrastructure/customer/repository/sequelize/customer.model";
import OrderModel from "../../../src/infrastructure/order/repository/sequelize/order.model";
import OrderItemModel from "../../../src/infrastructure/order/repository/sequelize/orderItem.model";
import ProductModel from "../../../src/infrastructure/product/repository/sequelize/product.model";
import CustomerRepository from "../../../src/infrastructure/customer/repository/sequelize/customerRepository";
import OrderRepository from "../../../src/infrastructure/order/repository/sequelize/orderRepository";
import ProductRepository from "../../../src/infrastructure/product/repository/sequelize/productRepository";

describe("OrderRepository test cases", () => {
  let squeleze: Sequelize;

  beforeEach(async () => {
    squeleze =  new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });

    squeleze.addModels([
      CustomerModel,
      ProductModel,
      OrderModel,
      OrderItemModel
    ]);
    await squeleze.sync();
  });

  afterEach(async () => {
    await squeleze.close();
  });

  it("should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1", "123-456");
    const customer = new Customer("1", "Customer 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "test", 1.99);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", "1", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });
    expect(orderModel.toJSON()).toStrictEqual({
      'id': '1',
      'total': 1.99,
      'customer_id': '1',
      'items': [
        {
          "id": "1",
          "name": "test",
          "order_id": "1",
          "price": 1.99,
          "product_id": "1",
          "quantity": 1,
        }
      ]
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('test', 123, 'test', 'TS', '1234-4321');
    const customer = new Customer('1', 'test', address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'test', 1.99);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const newProduct = new Product('2', 'other product', 2.99);
    await productRepository.create(newProduct);
    const newItem = new OrderItem('2', newProduct.name, newProduct.price, newProduct.id, 1);
    const newOrder = new Order('1', customer.id, [orderItem, newItem]);
    await orderRepository.update(newOrder);

    const orderModel = await OrderModel.findOne({
      where: {id: order.id},
      include: ['items']
    });

    expect(orderModel.toJSON()).toStrictEqual({
      'id': '1',
      'total': 4.98,
      'customer_id': '1',
      "items": [
        {
          "id": "1",
          "name": "test",
          "order_id": "1",
          "price": 1.99,
          "product_id": "1",
          "quantity": 1
        },
        {
          "id": "2",
          "name": "other product",
          "order_id": "1",
          "price": 2.99,
          "product_id": "2",
          "quantity": 1
        }
      ],
    });
  });

  it("should find a order by id", async () => {
    const customerRepository = new CustomerRepository();
    const address = new Address('test', 123, 'test', 'TS', '1234-4321');
    const customer = new Customer('1', 'test', address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'test', 1.99);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const orderItem = new OrderItem('1', product.name, product.price, product.id, 1);
    const order = new Order('1', customer.id, [orderItem]);
    await orderRepository.create(order);

    const foundedOrder = await orderRepository.find('1');
    expect(foundedOrder.id).toBe('1');
    expect(foundedOrder.total).toBe(1.99);
    expect(foundedOrder.items.length).toBe(1);
  });

  it("should throw OrderNotFoundError with a invalid id", async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find('1')).rejects.toThrowError(OrderNotFoundError);
  });

  it("should find alll orders", async() => {
    const customerRepository = new CustomerRepository();
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1", "123-456");
    const customer = new Customer("1", "Customer 1", address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "test", 1.99);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );
    const ordemItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("1", customer.id, [ordemItem]);
    const order2 = new Order("2", customer.id, [ordemItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2)
  
    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe('1');
    expect(orders[1].id).toBe('2');
  });
});