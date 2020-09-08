import axios from 'axios';
// const API_URL = process.env.API_URL || 'http://localhost:3000';
const API_URL = process.env.WEB_API_URL || 'https://api.shorten.godmerch.com';
const api = axios.create({
  baseURL: `${API_URL}`,
});
// const client = axios.create({
//   baseURL: `${API_URL}/api`,
// });

// export const createNewUser = (
//   fullName,
//   email,
//   password,
//   gender,
//   dateOfBirth
// ) => {
//   return client.post('user/sign-up', {
//     fullName,
//     email,
//     password,
//     gender,
//     dateOfBirth,
//   });
// };

// export const loginUser = (email, password) => {
//   return client.post('user/sign-in', {
//     email,
//     password,
//   });
// };

// export const getLinks = (token) => {
//   return client.post('link/links', { token });
// };

export const createNewUser = (
  fullName,
  email,
  password,
  gender,
  dateOfBirth
) => {
  return api.post('auth/sign-up', {
    fullName,
    email,
    password,
    gender,
    dateOfBirth,
  });
};

export const loginUser = (email, password) => {
  return api.post('auth/sign-in', {
    email,
    password,
  });
};

export const getLinks = (token) => {
  return api.get(`/links?page=${1}&perPage=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
