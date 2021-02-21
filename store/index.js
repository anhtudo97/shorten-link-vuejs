export const state = () => ({
  user: null,
  token: null,
  headers: null,
});

export const getters = {
  getUser: (state) => {
    return state.user;
  },
  getToken: (state) => {
    return state.token;
  },
  getHeaders: (state) => {
    return state.headers;
  },
};

export const mutations = {
  updateUser(state, payload) {
    state.user.name = payload.fullName;
    state.user.email = payload.email;
    state.user.token = payload.token;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setHeaders(state, payload) {
    state.headers = {
      headers: {
        Authorization: payload,
      },
    };
  },
};
