interface IAddress {
  get street(): string
  get number(): number
  get city(): string
  get state(): string
  get zipCode(): string
}

export default IAddress