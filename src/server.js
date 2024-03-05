import express  from "express";
import cors from "cors"
import { sequelize as conn } from "./db/conn.js";
import userRouter from './routes/userRoutes.js'
import companyRouter from "./routes/companyRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
 

const app = express()
const port = 3000

app.use(express.json())

app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

app.use('/api', userRouter)
app.use('/companies', companyRouter)
app.use('/reviews', reviewRouter)

conn.sync().then( () => {
    app.listen(port)
})
.catch((error) => console.log(error))