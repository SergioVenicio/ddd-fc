class RequiredParametersError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "RequiredParametersError"
  }
}

class PriceError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PriceError"
  }
}

class ParameterValueError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ParameterValueError"
  }
}

class ProductNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ProductNotFoundError"
  }
}

class CustomerNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "CustomerNotFoundError"
  }
}

class OrderNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "OrderNotFound"
  }
}

export {
  RequiredParametersError,
  PriceError,
  ParameterValueError,
  ProductNotFoundError,
  CustomerNotFoundError,
  OrderNotFoundError
}