import Customer from "../../../src/domain/customer/factory/customer.factory"

describe("CustomerFactory test case", () => {
  it("should be able to create a new product", () => {
    const customer = Customer.Create("test", "test str", 123, "test", "test", "123-321")

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("test")
    expect(customer.address.street).toBe("test str")
    expect(customer.address.number).toBe(123)
    expect(customer.address.city).toBe("test")
    expect(customer.address.state).toBe("test")
    expect(customer.address.zipCode).toBe("123-321")
  })
})