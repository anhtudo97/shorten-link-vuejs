import { Router } from 'express';
import { createNewUser, loginUser } from '../services/api';

const routeUser = new Router();

routeUser.get('/', (req, res) => {
  res.send({ msg: 'user' });
});

routeUser.post('/sign-up', async (req, res) => {
  const { fullName, email, password, gender, dateOfBirth } = req.body;
  let result = null;
  try {
    result = await createNewUser(
      fullName,
      email,
      password,
      gender,
      dateOfBirth
    );
  } catch (error) {
    console.log(error);
  }

  res.send(result.data);
});

routeUser.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;
  let result = null;
  try {
    result = await loginUser(email, password);
  } catch (error) {
    console.log(error);
  }

  res.send(result.data);
});

export default routeUser;
