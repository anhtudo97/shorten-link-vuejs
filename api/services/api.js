import axios from 'axios';

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
      Authorization: `Basic ${token}`,
    },
  });
};
