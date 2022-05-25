import { OrderNotFoundError } from "../../../../domain/@shared/errors/errors"
import Order from "../../../../domain/checkout/entity/order"
import OrderItem from "../../../../domain/checkout/entity/orderItem"
import IOrderRepository from "../../../../domain/checkout/repository/IOrderRepository"
import OrderModel from "./order.model"
import OrderItemModel from "./orderItem.model"


class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      total: entity.total,
      customer_id: entity.customerId,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }, {include: ['items']})
  }
  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: {order_id: entity.id},
        transaction: t,
      })

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }))
      await OrderItemModel.bulkCreate(items, { transaction: t })
      await OrderModel.update(
        { total: entity.total },
        { where: { id: entity.id }, transaction: t }
      )
    })
  }
  async find(id: string): Promise<Order> {
    const order = await  OrderModel.findOne(
      {where: {id}, include: ['items']},
    )
    if (!(order)) {
      throw new OrderNotFoundError(`Order ${id} not found!`)
    }
    const items = order.items.map(i => (
      new OrderItem(i.id, i.name, i.price, i.product_id, i.quantity)
    ))
    return new Order(
      order.id,
      order.customer_id,
      items
    )
  }
  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({include: ['items']})
    return orders.map(order => {
      const items = order.items.map(item => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        )
      })
      return new Order(
        order.id,
        order.customer_id,
        items
      )
    })
  }
}

export default OrderRepository