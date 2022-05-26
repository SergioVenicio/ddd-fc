import IValidator from "../../@shared/validator/Ivalidator";
import Product from "../entity/product";
import ProductYupValidator from "../validator/validator.yup";


class ProductValidatorFactory {
  static create(): IValidator<Product> {
    return new ProductYupValidator()
  }
}

export default ProductValidatorFactory