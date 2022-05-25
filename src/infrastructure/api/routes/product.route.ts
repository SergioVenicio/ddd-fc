import express, { Request, Response } from 'express'
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase'
import FindProductUseCase from '../../../usecase/product/find/find.product.usecase'
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase'
import UpdateProductUseCase from '../../../usecase/product/update/update.customer.usecase'
import ProductRepository from '../../product/repository/sequelize/productRepository'

const productRouter = express.Router()

productRouter.get('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new ListProductUseCase(repository)
  const output = await usecase.execute()
  res.send(output)
  return
})

productRouter.get('/:id', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new FindProductUseCase(repository)

  const input = {
    id: req.params.id
  }
  const output = await usecase.execute(input)
  res.send(output)
  return
})

productRouter.post('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new CreateProductUseCase(repository)
  const productDTO = {
    name: req.body.name,
    price: req.body.price
  }

  const output = await usecase.execute(productDTO)
  res.status(201).send(output)
  return
})

productRouter.put('/:id', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new UpdateProductUseCase(repository)

  const productDTO = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price
  }

  const output = await usecase.execute(productDTO)
  res.status(200).send(output)
  return
})


export default productRouter
