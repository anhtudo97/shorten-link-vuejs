export const state = () => ({
  domains: [
    {
      id: 11,
      domain: 'https://godgroup.atlassian.net/',
      createdAt: '2020-08-26T10:10:25.704675+07:00',
    },
    {
      id: 21,
      domain: 'https://gitlab.com/',
      createdAt: '2020-08-21T10:10:25.704675+07:00',
    },
    {
      id: 31,
      domain: 'https://humanbenchmark.com/dashboard',
      createdAt: '2020-08-26T10:11:25.704675+07:00',
    },
  ],
});

export const getters = {
  getDomains: (state) => {
    return state.domains;
  },
};

export const mutations = {};

export const actions = {};
