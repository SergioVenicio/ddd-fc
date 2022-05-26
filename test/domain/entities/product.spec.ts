import Product from "../../../src/domain/product/entity/product"

describe('Product test cases', () => {
  it("should not create Product without required fields",  () => {
    const product = new Product("", "test", 1.99)
    expect(product.hasErrors()).toBe(true)
  })

  it("should create Product",  () => {
    const product = new Product("test", "test", 1.99)
    expect(product.id).toBe("test")
    expect(product.name).toBe("test")
    expect(product.price).toBe(1.99)
  })

  it("should change Product price",  () => {
    const product = new Product("test", "test", 0.99)
    product.changePrice(1.99)
    expect(product.price).toBe(1.99)
  })

  it("should change Product price without value",  () => {
    const product = new Product("test", "test", 0.99)
    product.changePrice(0)

    expect(product.hasErrors()).toBe(true)
  })
})