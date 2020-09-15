export const state = () => ({
  user: {
    name: '',
    email: '',
    token: '',
  },
});

export const getters = {
  getUser: (state) => {
    return state.user;
  },
};

export const mutations = {
  updateUser(state, payload) {
    state.user.name = payload.fullName;
    state.user.email = payload.email;
    state.user.token = payload.token;
  },
};
