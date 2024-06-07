import express from 'express'
import router from '@/routes'
import databaseService from '@/services/database.service'

const app = express()

const port = 3000

app.use(express.json())
app.use(router)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  return res.status(400).json({
    error: err.message
  })
})

databaseService.connect()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
