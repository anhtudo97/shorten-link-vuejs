export const state = () => ({
  notifications: [],
});

export const getters = {
  getNotifications: (state) => {
    return state.notifications;
  },
};

export const mutations = {
  setNotifications: (state, payload) => {
    state.notifications = payload.notifications;
  },
};
