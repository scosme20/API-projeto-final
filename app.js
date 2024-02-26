import  express  from "express";
import userRoutes from   './Api/src/Routes/userRoutes.js';



class app {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }
}

middlewares(); {
    this.app.use(express.urlencoded({ extended: true }));
    this.express.use(express.json())
}


routes(); {
  this.app.use('/', userRoutes());
}

export default new app().app;
