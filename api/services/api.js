import axios from 'axios';
import FormData from 'form-data';

const api = axios.create({
  baseURL: process.env.WEB_API_URL || 'https://api.shorten.godmerch.com',
});

export const createNewUser = (
  fullName,
  email,
  password,
  gender,
  dateOfBirth
) => {
  const form = new FormData();
  form.append('email', email);
  form.append('password', password);
  form.append('fullName', fullName);
  form.append('gender', gender);
  form.append('dateOfBirth', dateOfBirth);
  console.log(form);
  return api.post('auth/sign-up', form, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
