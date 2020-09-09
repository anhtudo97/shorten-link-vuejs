import axios from 'axios';
// const API_URL = process.env.API_URL || 'http://localhost:3000';
// const API_URL = process.env.WEB_API_URL || 'https://api.shorten.godmerch.com';
const api = axios.create({
  baseURL: `http://139.180.213.253`,
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

// export const createNewDomain = (token, name) => {
//   return client.post('domain/domains', { token, name });
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

export const createNewDomain = (token, name) => {
  return api.post(
    `/domains`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDomains = (token, page) => {
  return api.get(
    `/domains?page=${page}&perPage=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getDomain = (token, id) => {
  return api.get(
    `/domains/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


