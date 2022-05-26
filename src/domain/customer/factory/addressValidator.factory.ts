import IValidator from "../../@shared/validator/Ivalidator";
import Address from "../entity/address";
import AddressYupValidator from "../validator/address.validator.yup";

class AddressValidatorFactory {
  static create(): IValidator<Address> {
    return new AddressYupValidator()
  }
}

export default AddressValidatorFactory