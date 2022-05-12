import Customer from "../../customer/entity/customer";
import IRepository from "../../@shared/repository/IRepository";

interface ICustomerRepository extends IRepository<Customer> {}

export default ICustomerRepository;