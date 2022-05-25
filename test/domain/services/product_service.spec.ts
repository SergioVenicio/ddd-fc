import Product from "../../../src/domain/product/entity/product"
import ProductService from "../../../src/domain/product/service/product_service"

import { ParameterValueError } from "../../../src/domain/@shared/errors/errors"

describe("ProductService test cases", () => {
  it("should change the prices off all products", () => {
    const products = [
      new Product("1", "product one", 1),
      new Product("2", "product two", 2),
    ]

    const updatedProducts = ProductService.IncreasePrice(products, 10)

    expect(updatedProducts[0].price).toBe(1.1)
    expect(updatedProducts[1].price).toBe(2.2)
  })

  it("should not change the prices with invalid parameters", () => {
    expect(() => {
      ProductService.IncreasePrice([], 10)
    }).toThrow(ParameterValueError)

    expect(() => {
      const products = [new Product("1", "product one", 1)]
      ProductService.IncreasePrice(products, 0)
    }).toThrow(ParameterValueError)
  })
})