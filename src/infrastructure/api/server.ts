import dotenv from 'dotenv'

import { app, sequelize } from './express'


dotenv.config()

const port: Number = Number(process.env.PORT) || 3000
app.listen(port, () => {
  console.log(`:${port}`)
})