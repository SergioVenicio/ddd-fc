import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { HasManyAddAssociationMixin } from "sequelize/types";
import CustomerModel from "./customer.model";
import OrderItemModel from "./orderItem.model";


@Table({
  tableName: 'orders',
  timestamps: false
})
class OrderModel extends Model {
  public addItem: HasManyAddAssociationMixin<OrderItemModel, OrderItemModel>;

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare total: number;

  @ForeignKey(() => CustomerModel)
  @Column({allowNull: false})
  declare customer_id: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];
}

export default OrderModel;