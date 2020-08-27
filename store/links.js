export const state = () => ({
  links: [
    {
      id: 1,
      link: 'https://humanbenchmark.com/dashboard',
      slashtag: 'rebrand.ly/241b6',
      click: 12,
      date: '2020-08-26T10:10:25.704675+07:00',
    },
    {
      id: 2,
      link: 'https://humanbenchmark.com/dashboard',
      slashtag: 'rebrand.ly/241b5',
      click: 12,
      date: '2020-08-21T10:10:25.704675+07:00',
    },
    {
      id: 3,
      link: 'https://humanbenchmark.com/dashboard',
      slashtag: 'rebrand.ly/241b9',
      click: 12,
      date: '2020-08-26T10:11:25.704675+07:00',
    },
  ],
  key: '',
});

export const getters = {
  getLinks: (state) => {
    return state.links;
  },
};

export const mutations = {};

export const actions = {};
