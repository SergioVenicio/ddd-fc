interface CreateProductDTO {
  name: string;
  price: number;
}

interface CreateProductResponseDTO {
  id: string;
  name: string;
  price: number;
}

export { CreateProductDTO, CreateProductResponseDTO }