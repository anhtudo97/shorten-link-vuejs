import { Router } from 'express';
import { createNewUser } from '../services/api';

const routeUser = new Router();

routeUser.get('/', (req, res) => {
  res.send({ msg: 'user' });
});

routeUser.post('/sign-up', async (req, res) => {
  const { fullName, email, password, gender, dateOfBirth } = req.body;
  console.log({ fullName, email, password, gender, dateOfBirth });
  const result = await createNewUser(
    fullName,
    email,
    password,
    gender,
    dateOfBirth
  );
  console.log(result);
  res.send(result.data);
});

export default routeUser;
