import IValidator from "../../@shared/validator/Ivalidator";
import Customer from "../entity/customer";

import * as yup from 'yup'


class CustomerYupValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required!'),
          name: yup.string().required('Name is required!')
        }).validateSync({
          id: entity.id,
          name: entity.name
        }, {
          abortEarly: false
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          message: error,
          context: 'customer'
        })
      })
    }
  }
}

export default CustomerYupValidator