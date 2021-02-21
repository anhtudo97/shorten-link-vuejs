import { getWorkspacesJoined } from '@/services/api';

export const state = () => ({
  workspaces: [],
  page: 1,
  total: 0,
  totalPage: 1,
});

export const getters = {
  getWorkspaces: (state) => {
    return state.workspaces;
  },
  getTotal: (state) => {
    return state.total;
  },
  getTotalPage: (state) => {
    return state.totalPage;
  },
};

export const mutations = {
  setWorkspaces: (state, workspaces) => {
    state.workspaces = workspaces;
  },
  setTotalWorkspaces: (state, total) => {
    state.total = total;
  },
  setTotalPageWorkspaces: (state, totalPage) => {
    state.totalPage = totalPage;
  },
};

export const actions = {
  async setWorkspaces({ commit }, payload) {
    const token = localStorage.getItem('token');
    const { page } = payload;
    try {
      const resWorkspace = await getWorkspacesJoined(token, page);
      const { status, data } = resWorkspace.data;
      if (status === 200) {
        const { invitations, total, totalPage } = data;
        commit('setWorkspaces', invitations);
        commit('setTotalWorkspaces', total);
        commit('setTotalPageWorkspaces', totalPage);
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
