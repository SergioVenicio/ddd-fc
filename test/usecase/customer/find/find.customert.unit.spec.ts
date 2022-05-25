import Address from "../../../../src/domain/customer/entity/address"
import Customer from "../../../../src/domain/customer/entity/customer"

import FindCustomerUseCase from "../../../../src/usecase/customer/find/find.customer.usecase"


describe("unit test find customer usecase", () => {
  it("should find a customer", async () => {
    const customer = new Customer(
      "123",
      "John Doe",
      new Address("test", 123, "test", "TS", "1234-543")
    )

    const customerRepository = {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn().mockReturnValue(Promise.resolve([customer])),
      create: jest.fn(),
      update: jest.fn()
    }
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository)

    await customerRepository.create(customer)

    const findInput = {
      id: "123"
    }

    const response = await findCustomerUseCase.execute(findInput)
    expect(response).toStrictEqual({
      id: "123",
      name: "John Doe",
      address: {
        street: "test",
        number: 123,
        city: "test",
        state: "TS",
        zipCode: "1234-543"
      }
    })
  })
})