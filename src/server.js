import express  from "express";
import cors from "cors"
import { sequelize as conn } from "./db/conn.js";
import { userRouter } from "./routes/userRoutes.js"; 

const app = express()
const port = 3000

app.use(express.json())

app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

app.use('/users', userRouter)

conn.sync().then( () => {
    app.listen(port)
})
.catch((error) => console.log(error))