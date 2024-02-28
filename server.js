import express  from "express";
import { sequelize as conn } from "./src/db/conn.js";

const app = express()
const port = 3000

app.use(express.json())

conn.sync().then( () => {
    app.listen(port)
})
.catch((error) => console.log(error))