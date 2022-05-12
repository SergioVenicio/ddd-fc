import { Column, Default, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table({
  tableName: 'customers',
  timestamps: false
})
class CustomerModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({allowNull: false})
  declare name: string;

  @Column({allowNull: false})
  declare active: boolean;

  @Column({allowNull: false})
  declare street: string;

  @Column({allowNull: false})
  declare number: number;

  @Column({allowNull: false})
  declare city: string;

  @Column({allowNull: false})
  declare state: string;

  @Column({allowNull: false})
  declare zipCode: string;

  @Default(0)
  @Column
  declare rewardPoints: number;
}

export default CustomerModel;