interface ListProductResponseDTO {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export { ListProductResponseDTO }