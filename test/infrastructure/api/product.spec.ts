import request from 'supertest'
import { app, sequelize } from '../../../src/infrastructure/api/express'

describe('api end to end product test', () => {
  beforeEach(async () => {
    await sequelize.sync({
      force: true,
    })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app)
      .post('/product')
      .send({
        name: 'Test',
        price: 1.99
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe('Test')
    expect(response.body.price).toBe(1.99)
  })

  it('should list product', async () => {
    await request(app)
      .post('/product')
      .send({
        name: 'Test',
        price: 1.99
      })
    const response = await request(app).get('/product').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.products.length).toBe(1)
    expect(response.body.products[0].name).toBe('Test')
  })

  it('should find a customer', async () => {
    const { body } = await request(app)
      .post('/product')
      .send({
        name: 'Test',
        price: 1.99
      })
    const response = await request(app).get(`/product/${body.id}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(body.id)
  })

  it('should update a product', async () => {
    const { body } = await request(app)
      .post('/product')
      .send({
        name: 'Test',
        price: 1.99
      })
    const response = await request(app)
                            .put(`/product/${body.id}`)
                            .send({
                              name: 'updt Test',
                              price: 2.99
                            })

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(body.id)
    expect(response.body.name).toBe('updt Test')
    expect(response.body.price).toBe(2.99)
  })
})
