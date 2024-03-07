import express  from "express";
import cors from "cors"
import { sequelize as conn } from "./db/conn.js";
import userRouter from './routes/userRoutes.js'
import companyRouter from "./routes/companyRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import productRouter from "./routes/productRoutes.js";
 

const app = express()
const port = 3000

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json' assert { type: 'json' }

app.use(express.json())

app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use('/api/users', userRouter)
app.use('/api/companies', companyRouter)
app.use('/api/reviews', reviewRouter)
app.use('/api/products', productRouter)

conn.sync().then( () => {
    app.listen(port)
})
.catch((error) => console.log(error))