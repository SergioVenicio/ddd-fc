interface FindCustomerDTO {
  id: string
}

interface FindCustomerResponseDTO {
  id: string
  name: string
  address: {
    street: string
    number: number
    city: string
    state: string
    zipCode: string
  }
}

export {
  FindCustomerDTO,
  FindCustomerResponseDTO
}