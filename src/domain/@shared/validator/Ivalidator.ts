interface IValidator<T> {
  validate(entity: T): void
}

export default IValidator