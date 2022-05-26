import IValidator from "../../@shared/validator/Ivalidator"
import Address from "../entity/address"

import * as yup from 'yup'

class AddressYupValidator implements IValidator<Address> {
  validate(entity: Address): void {
    try {
      yup
        .object()
        .shape({
          street: yup.string().required("Street is required!"),
          number: yup.number().required("Number is required!"),
          city: yup.string().required("City is required!"),
          state: yup.string().required("State is required!"),
        })
        .validateSync({
          street: entity.street,
          number: entity.number,
          city: entity.city,
          state: entity.state,
        }, {
          abortEarly: false
        });
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          message: error,
          context: "address",
        });
      });
    }
  }
}

export default AddressYupValidator