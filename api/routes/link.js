import { Router } from 'express';
import { getLinks } from '../services/api';
const routeLink = new Router();

routeLink.get('/', (req, res) => {
  res.send({ msg: 'link' });
});

routeLink.post('/links', async (req, res) => {
  const { token } = req.body;
  console.log(token);
  let result = null;
  try {
    result = await getLinks(token);
  } catch (error) {
    console.log(error);
  }
  console.log(result)
  // res.send(result.data);
});

export default routeLink;
