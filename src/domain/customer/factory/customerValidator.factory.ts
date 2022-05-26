import IValidator from "../../@shared/validator/Ivalidator";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.validator.yup";


class CustomerValidatorFactory {
  static create(): IValidator<Customer> {
      return new CustomerYupValidator()
  }
}

export default CustomerValidatorFactory