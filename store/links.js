export const state = () => ({
  loading: false,
  sort: 'created_at',
  direction: 'DESC',
  links: [
    // {
    //   id: 1,
    //   link: 'https://humanbenchmark.com/dashboard',
    //   slashtag: 'rebrand.ly/241b6',
    //   click: 12,
    //   date: '2020-08-26T10:10:25.704675+07:00',
    // },
    // {
    //   id: 2,
    //   link: 'https://humanbenchmark.com/dashboard2',
    //   slashtag: 'rebrand.ly/241b5',
    //   click: 12,
    //   date: '2020-08-21T10:10:25.704675+07:00',
    // },
    // {
    //   id: 3,
    //   link: 'https://humanbenchmark.com/dashboard3',
    //   slashtag: 'rebrand.ly/241b9',
    //   click: 12,
    //   date: '2020-08-26T10:11:25.704675+07:00',
    // },
  ],
});

export const getters = {
  getLinks: (state) => {
    return state.links;
  },
  getLoading: (state) => {
    return state.loading;
  },
  getSort: (state) => {
    return state.sort
  },
  getDirection: (state) => {
    return state.direction
  }
};

export const mutations = {
  updateLinks: (state, payload) => {
    state.links = payload.links
  },
  setSort: (state, sort) => {
    state.sort = sort
  },
  setDirection: (state, direction) => {
    state.direction = direction
  },
};

export const actions = {
};
