import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository";
import {CreateCustomerDTO, CreateCustomerResponseDTO} from "./create.customer.dto";

class CreateCustomerUseCase {
  private repository: ICustomerRepository;

  constructor(repository: ICustomerRepository) {
    this.repository = repository;
  }

  async execute(input: CreateCustomerDTO): Promise<CreateCustomerResponseDTO> {
    const customer = CustomerFactory.Create(
      input.name,
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.state,
      input.address.zipCode
    );
    await this.repository.create(customer as Customer);
    return {
      ...input,
      id: customer.id
    }
  }
}

export default CreateCustomerUseCase;