import { Router } from 'express';
const routeLink = new Router();

routeLink.get('/', (req, res) => {
  res.send({ msg: 'OK' });
});

export default routeLink;
