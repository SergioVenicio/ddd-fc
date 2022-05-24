interface UpdateProductDTO {
  id: string;
  name: string;
  price: number;
}

interface UpdateProductResponseDTO {
  id: string;
  name: string;
  price: number;
}

export { UpdateProductDTO, UpdateProductResponseDTO }