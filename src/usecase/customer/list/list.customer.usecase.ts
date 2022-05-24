import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import { ListCustomerResponseDTO } from "./list.customer.dto";

class ListCustomerUseCase {
  private repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(): Promise<ListCustomerResponseDTO> {
    const customers = await this.repository.findAll();
    const response = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      }
    }));
    return {
      customers: response
    };
  }
}

export default ListCustomerUseCase;