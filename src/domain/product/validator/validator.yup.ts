import IValidator from "../../@shared/validator/Ivalidator"
import Product from "../entity/product"

import * as yup from 'yup'


class ProductYupValidator implements IValidator<Product> {
  validate(entity: any): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required!'),
          name: yup.string().required('Name is required!'),
          price: yup.number().moreThan(0).required('Price is required!'),
        }).validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price
        }, {
          abortEarly: false
        })
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach(error => {
        entity.notification.addError({
          message: error,
          context: 'product'
        })
      })
    }
  }
}

export default ProductYupValidator