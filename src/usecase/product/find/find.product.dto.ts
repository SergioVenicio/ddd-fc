interface FindCustomerDTO {
  id: string;
}

interface FindCustomerResponseDTO {
  id: string;
  name: string;
  price: number;
}

export { FindCustomerDTO, FindCustomerResponseDTO }