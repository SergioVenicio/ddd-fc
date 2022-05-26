import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../customer/repository/sequelize/customer.model'
import ProductModel from '../product/repository/sequelize/product.model'
import customerRouter from './routes/customer.route'
import productRouter from './routes/product.route'

const app: Express = express()

app.use(express.json())
app.use('/customer', customerRouter)
app.use('/product', productRouter)

let sequelize: Sequelize
async function setupDB() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })

  await sequelize.addModels([
    CustomerModel,
    ProductModel
  ])

  await sequelize.sync()
}

setupDB()

export { app, sequelize }
