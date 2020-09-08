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
  updateUser(state, { name, email, token }) {
    state.user.name = name;
    state.user.email = email;
    state.user.token = token;
  },
};

