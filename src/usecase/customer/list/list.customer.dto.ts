type Customer = {
  id: string;
  name: string;
  address: {
    street: string;
    number: number;
    city: string;
    state: string;
    zipCode: string;
  };
}

interface ListCustomerResponseDTO {
  customers: Customer[]
}

export { ListCustomerResponseDTO }