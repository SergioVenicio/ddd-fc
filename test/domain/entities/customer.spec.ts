import Address from "../../../src/domain/customer/entity/address"
import Customer from "../../../src/domain/customer/entity/customer"
import { RequiredParametersError } from "../../../src/domain/@shared/errors/errors"

describe('Customer test cases', () => {
  it("should create new Address", () => {
    const goted = new Address("test street", 123, "test city", "test state", "123-321")

    expect(goted.street).toBe("test street")
    expect(goted.number).toBe(123)
    expect(goted.state).toBe("test state")
    expect(goted.city).toBe("test city")
    expect(goted.zipCode).toBe("123-321")
  })

  it("should not create Address without required fields", () => {
    const address = new Address("", 123, "test", "test", "test")
    expect(address.hasErrors()).toBe(true)
  })

  it("should create new Customer", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321")
    const goted = new Customer("123", "test", customerAddr)

    expect(goted.id).toBe("123")
    expect(goted.name).toBe("test")
    expect(goted.address).toBe(customerAddr)
  })

  it("should activate and deactivate Customer", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321")
    const customer = new Customer("123", "test", customerAddr)
    expect(customer.active).toBe(false)

    customer.activate()
    expect(customer.isActive()).toBe(true)

    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })

  it("should not create Customer without required fields", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321")

    const customer = new Customer("", "test", customerAddr)

    expect(customer.hasErrors()).toBe(true)
  })

  it("should add reward points", () => {
    const customerAddr = new Address("test", 123, "test", "test", "123-321")
    const customer = new Customer("123", "test", customerAddr)

    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})