import  express  from 'express';
import  homeRoutes  from '../src/Routes/homeRoutes.js';

class app {
  constructor () {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes)
  }

}
const port = 3000




export default  new app().app;
