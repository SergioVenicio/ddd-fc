import ICustomerRepository from "../../../domain/customer/repository/ICustomerRepository"
import { FindCustomerDTO, FindCustomerResponseDTO } from "./find.customer.dto"


class FindCustomerUseCase {
  private repository: ICustomerRepository

  constructor(repository: ICustomerRepository) {
    this.repository = repository
  }

  async execute(input: FindCustomerDTO): Promise<FindCustomerResponseDTO> {
    const customer = await this.repository.find(input.id)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        city: customer.address.city,
        state: customer.address.state,
        zipCode: customer.address.zipCode,
      },
    }
  }
}

export default FindCustomerUseCase