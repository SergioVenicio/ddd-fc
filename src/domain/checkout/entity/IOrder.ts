import IOrderItem from "./IOrderItem"

interface IOrder {
  get id(): string
  get customerId(): string
  get total(): number
  get items(): IOrderItem[]
}

export default IOrder