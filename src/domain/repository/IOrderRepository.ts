import Order from "../entities/order";
import IRepository from "./IRepository";

interface IOrderRepository extends IRepository<Order> {}

export default IOrderRepository;