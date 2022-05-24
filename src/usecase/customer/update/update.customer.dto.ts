interface UpdateCustomerDTO {
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

interface UpdateCustomerResponseDTO {
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

export { UpdateCustomerDTO, UpdateCustomerResponseDTO }