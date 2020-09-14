export const state = () => ({
  loading: false,
  sort: 'created_at',
  direction: 'DESC',
  links: [],
});

export const getters = {
  getLinks: (state) => {
    return state.links;
  },
  getLoading: (state) => {
    return state.loading;
  },
  getSort: (state) => {
    return state.sort;
  },
  getDirection: (state) => {
    return state.direction;
  },
};

export const mutations = {
  updateLinks: (state, payload) => {
    state.links = payload.links;
  },
  setSort: (state, sort) => {
    state.sort = sort;
  },
  setDirection: (state, direction) => {
    state.direction = direction;
  },
};

export const actions = {};
