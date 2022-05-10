import Customer from "./domain/entities/customer";
import Address from "./domain/entities/address";

import OrderItem from "./domain/entities/orderItem";
import Order from "./domain/entities/order";


const customerAddress = new Address("Main street", 123, "New York", "NY", "123");
const customer = new Customer("123", "Joe Doh", customerAddress);
customer.activate();

const item1 = new OrderItem("1", "1", 10.99, "1", 1);
const item2 = new OrderItem("1", "1", 15.99, "2", 1);
const order = new Order("123", customer.id, [item1, item2]);


console.log(`Total: $${order.total}`);