import express from 'express'
import router from '@/routes'
import databaseService from '@/services/database.service'
import { errorHandler } from '@/middlewares/error.middleware'

databaseService.connect()

const app = express()

const port = 3001

app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
