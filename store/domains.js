import { getDomains } from '@/services/api';

export const state = () => ({
  domains: [],
  total: 0,
  totalPage: 1,
});

export const getters = {
  getDomains: (state) => {
    return state.domains;
  },
  getTotal: (state) => {
    return state.total;
  },
  getTotalPage: (state) => {
    return state.totalPage;
  },
};

export const mutations = {
  setDomains: (state, domains) => {
    state.domains = domains;
  },
  setTotal: (state, total) => {
    state.total = total;
  },
  setTotalPage: (state, totalPage) => {
    state.totalPage = totalPage;
  },
};

export const actions = {
  async setDomains({ commit }, payload) {
    const token = localStorage.getItem('token');
    const { page } = payload;
    try {
      const resDomain = await getDomains(token, page);
      const { status, data } = resDomain.data;
      if (status === 200) {
        const { domains, total, totalPage } = data;
        commit('setDomains', domains);
        commit('setTotal', total);
        commit('setTotalPage', totalPage);
      }
    } catch (error) {
      const { status } = error.response;
      if (status === 401) {
        this.$router.push('/login');
        window.localStorage.clear();
      }
    }
  },
};
