import  Express  from "express";
const app = express();
const port = 3000


app.use(express.json());


app.listen(`Servidor rodando na porta ${port}`);

//CRUD - Create, Read,
