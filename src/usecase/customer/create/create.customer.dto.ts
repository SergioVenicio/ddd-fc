interface CreateCustomerDTO {
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  }
}

interface CreateCustomerResponseDTO {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  }
}

export { CreateCustomerDTO, CreateCustomerResponseDTO };