import express, { request, Request, Response } from 'express'
import { ParameterValueError } from '../../../domain/@shared/errors/errors'
import Logger from '../../../domain/@shared/logger/Logger'
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase'
import FindCustomerUseCase from '../../../usecase/customer/find/find.customer.usecase'
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase'
import UpdateCustomerUseCase from '../../../usecase/customer/update/update.customer.usecase'
import CustomerRepository from '../../customer/repository/sequelize/customerRepository'

const customerRouter = express.Router()

customerRouter.get('/', async (req: Request, res: Response) => {
  const logger = new Logger()
  const repository = new CustomerRepository(logger)
  const usecase = new ListCustomerUseCase(repository)
  const output = await usecase.execute()
  res.send(output)
  return
})

customerRouter.get('/:id', async (req: Request, res: Response) => {
  const logger = new Logger()
  const repository = new CustomerRepository(logger)
  const usecase = new FindCustomerUseCase(repository)

  const input = {
    id: req.params.id
  }
  const output = await usecase.execute(input)
  res.send(output)
  return
})

customerRouter.post('/', async (req: Request, res: Response) => {
  const logger = new Logger()
  const repository = new CustomerRepository(logger)
  const usecase = new CreateCustomerUseCase(repository)
  const customerDTO = {
    name: req.body.name,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      number: req.body.address.number,
      zipCode: req.body.address.zipCode,
    },
  }

  try {
    const output = await usecase.execute(customerDTO)
    res.status(201).send(output)
    return
  } catch(error) {
    if (error instanceof ParameterValueError) {
      res.status(400).send(error)
      return
    }

    res.status(500).send(error)
    return
  }
})

customerRouter.put('/:id', async (req: Request, res: Response) => {
  const logger = new Logger()
  const repository = new CustomerRepository(logger)
  const usecase = new UpdateCustomerUseCase(repository)

  const customerDTO = {
    id: req.params.id,
    name: req.body.name,
    address: {
      street: req.body.address.street,
      city: req.body.address.city,
      state: req.body.address.state,
      number: req.body.address.number,
      zipCode: req.body.address.zipCode,
    },
  }

  const output = await usecase.execute(customerDTO)
  res.status(200).send(output)
  return
})


export default customerRouter
