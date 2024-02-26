import  routes  from "express";
const router = new routes();

router.get('/', (req, res) => {
  res.send('User route');
});

export default router;
