import express from 'express';
import bodyParser from 'body-parser';

import routeUser from './routes/user';
import routeLink from './routes/link';
import routeHealthz from './routes/healthz';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ msg: process.env.WEB_API_URL });
});

app.use('/user', routeUser);
app.use('/link', routeLink);
app.use('/healthz', routeHealthz);

module.exports = {
  path: '/api',
  handler: app,
};
