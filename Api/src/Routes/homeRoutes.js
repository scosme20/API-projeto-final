import  Router  from 'express';

const router = new Router();

router.get('/', (req, res) => {
  res.send('Teste Api')
})


export default router;
