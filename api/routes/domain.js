import { Router } from 'express';
import { getLinks } from '../services/api';
const routeLink = new Router();

routeLink.get('/', (req, res) => {
  res.send({ msg: 'link' });
});

routeLink.post('/domain', async (req, res) => {
  const { token, name } = req.body;

  let result = null;
  try {
    result = await getLinks(token, name);
  } catch (error) {
    console.log(error);
  }

  res.send(result.data);
});

export default routeLink;
