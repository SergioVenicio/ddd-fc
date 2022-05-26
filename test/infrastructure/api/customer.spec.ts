import request from 'supertest'
import { app, sequelize } from '../../../src/infrastructure/api/express'

describe('api end to end customer test', () => {
  beforeEach(async () => {
    await sequelize.sync({
      force: true,
    })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'street',
          city: 'city',
          number: 123,
          zipCode: '1234-4310',
          state: 'state',
        },
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.name).toBe('John')
    expect(response.body.address.street).toBe('street')
    expect(response.body.address.city).toBe('city')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zipCode).toBe('1234-4310')
    expect(response.body.address.state).toBe('state')
  })

  it('should list customers', async () => {
    await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'street',
          city: 'city',
          number: 123,
          zipCode: '1234-4310',
          state: 'state',
        },
      })
    const response = await request(app).get('/customer').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.customers.length).toBe(1)
    expect(response.body.customers[0].name).toBe('John')
  })

  it('should find a customer', async () => {
    const { body } = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'street',
          city: 'city',
          number: 123,
          zipCode: '1234-4310',
          state: 'state',
        },
      })
    const response = await request(app).get(`/customer/${body.id}`).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(body.id)
  })

  it('should update a customer', async () => {
    const { body } = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'street',
          city: 'city',
          number: 123,
          zipCode: '1234-4310',
          state: 'state',
        },
      })
    const response = await request(app)
                            .put(`/customer/${body.id}`)
                            .send({
                              name: 'updt John',
                              address: {
                                street: 'updt street',
                                city: 'city',
                                number: 123,
                                zipCode: '1234-4310',
                                state: 'state',
                              },
                            })

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(body.id)
    expect(response.body.name).toBe('updt John')
    expect(response.body.address.street).toBe('updt street')
  })
})
