import express  from "express";
import cors from "cors"
import { sequelize as conn } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js"; 
import { companiesROUTER, companiesRouter } from "./routes/companies.routes.js"; 


const app = express()
const port = 3000

app.use(express.json())

app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

app.use('/users', userRouter)

app.use('/companies', companiesRouter)

conn.sync().then( () => {
    app.listen(port)
})
.catch((error) => console.log(error))