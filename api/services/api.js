import axios from 'axios';
import FormData from 'form-data';

const api = axios.create({
  baseURL: `https://api.shorten.godmerch.com`,
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

  return api.post('auth/sign-up', form);
};

export const loginUser = (email, password) => {
  return api.post('auth/sign-in', {
    email,
    password,
  });
};
