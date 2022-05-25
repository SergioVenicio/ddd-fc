import ProductFactory from "../../../src/domain/product/factory/product.factory"

describe("ProductFactory test case", () => {
  it("should be able to create a new product", () => {
    const product = ProductFactory.Create("test", 1.99)
    const productWithDescount = ProductFactory.Create("test b", 10, true)

    expect(product.id).toBeDefined()
    expect(product.name).toBe("test")
    expect(product.price).toBe(1.99)
    expect(product.constructor.name).toBe("Product")

    expect(productWithDescount.price).toBe(9)
  })
})