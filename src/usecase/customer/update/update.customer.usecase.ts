import Address from "../../../domain/customer/entity/address";
import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import { UpdateCustomerDTO, UpdateCustomerResponseDTO } from "./update.customer.dto";

class UpdateCustomerUseCase {
  private repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(input: UpdateCustomerDTO): Promise<UpdateCustomerResponseDTO> {
    const address = new Address(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.state,
      input.address.zipCode,
    );
    const customer = new Customer(
      input.id,
      input.name,
      address
    )
    await this.repository.update(customer);
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      }
    }
  }
}

export default UpdateCustomerUseCase;