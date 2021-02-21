export const state = () => ({
    notifications: [],
    total: 0
});

export const getters = {
    getNotifications: (state) => {
        return state.notifications;
    },
    getTotal: (state) => {
        return state.total;
    },
};

export const mutations = {
    setNotifications: (state, notifications) => {
        state.notifications = notifications;
    },
    setTotal: (state, total) => {
        state.total = total;
    },
};

export const actions = {
    setNotifications({ commit }, notifications) {
        commit('setNotifications', notifications)
    },
    setTotal({ commit }, total) {
        commit('setTotal', total)
    },
}