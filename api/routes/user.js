import { Router } from 'express';
import { createNewUser } from '../services/api';

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

export default routeUser;
