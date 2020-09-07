import axios from 'axios';
import FormData from 'form-data';
const client = axios.create({
  baseURL: `https://api.shorten.godmerch.com`,
  // baseURL: `${API_URL}/api`,
});

export const createNewUser = (
  fullName,
  email,
  password,
  gender,
  dateOfBirth
) => {
  // return client.post('auth/sign-up', {
  //   fullName: fullName,
  //   email: email,
  //   password: password,
  //   gender: gender,
  //   dateOfBirth: dateOfBirth,
  // });
  const form = new FormData();
  form.append('email', email);
  form.append('password', password);
  form.append('fullName', fullName);
  form.append('gender', gender);
  form.append('dateOfBirth', dateOfBirth);
  console.log(form);
  return client.post('auth/sign-up', form, {
    headers: {
      'content-type': 'application/json',
    },
  });
};
