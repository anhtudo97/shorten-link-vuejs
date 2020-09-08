import axios from 'axios';
import FormData from 'form-data';
const API_URL = process.env.API_URL || 'http://localhost:3000';
// const API_URL = process.env.WEB_API_URL || 'https://api.shorten.godmerch.com';
// const client = axios.create({
//   baseURL: `${API_URL}`,
// });
const client = axios.create({
  baseURL: `${API_URL}/api`,
});

export const createNewUser = (
  fullName,
  email,
  password,
  gender,
  dateOfBirth
) => {
  const form = new FormData();
  form.append('fullName', fullName);
  form.append('email', email);
  form.append('password', password);
  form.append('gender', gender);
  form.append('dateOfBirth', dateOfBirth);

  return client.post('auth/sign-up', form);
};

export const loginUser = (email, password) => {
  return client.post('user/sign-in', {
    email,
    password,
  });
};
