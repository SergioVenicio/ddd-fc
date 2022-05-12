import Order from "../entity/order";
import IRepository from "../../@shared/repository/IRepository";

interface IOrderRepository extends IRepository<Order> {}

export default IOrderRepository;