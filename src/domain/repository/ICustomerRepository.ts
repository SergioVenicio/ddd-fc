import Customer from "../entities/customer";
import IRepository from "./IRepository";

interface ICustomerRepository extends IRepository<Customer> {}

export default ICustomerRepository;