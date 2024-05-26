import mongoose from 'mongoose'
import express from 'express'
import usersRouter from '@/routes/users.routes'
import router from '@/routes'
import databaseService from '@/services/database.service'

const app = express()

const port = 3000

app.use(express.json())
app.use(router)

databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
