import { Router } from 'express';
import { getLinks } from '../services/api';
const routeLink = new Router();

routeLink.get('/', (req, res) => {
    res.send({ msg: 'link' });
});

routeLink.post('/links', async(req, res) => {
    const { token } = req.body;
    try {
        await getLinks(token);
    } catch (error) {}
});

export default routeLink;