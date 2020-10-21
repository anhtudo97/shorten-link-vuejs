import {
  getWorkspaces,
  getMembersWorkspaces,
  getDomainsWorkspace,
  getLinksWorkspaces,
} from '@/services/api';

export const state = () => ({
  workspaces: [],
  total: 0,
  totalPage: 1,
  links: {
    links: [],
    page: 1,
    total: 0,
    totalPage: 1,
    sort: 'created_at',
    direction: 'DESC',
    domainSelected: [],
    userIdsSelected: [],
  },
  domains: {
    domains: [],
    page: 1,
    total: 0,
    totalPage: 1,
  },
  members: {
    members: [],
    page: 1,
    total: 0,
    totalPage: 1,
  },
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
  // links
  getLinksWorkspace: (state) => {
    return state.links.links;
  },
  getLinksPageWorkspace: (state) => {
    return state.links.page;
  },
  getLinksTotalWorkspace: (state) => {
    return state.links.total;
  },
  getLinksSort: (state) => {
    return state.links.sort;
  },
  getLinksDirection: (state) => {
    return state.links.direction;
  },
  getLinksDomainSelected: (state) => {
    return state.links.domainSelected;
  },
  getLinksUserIdsSelected: (state) => {
    return state.links.userIdsSelected;
  },
  getLinksTotalPageWorkspace: (state) => {
    return state.links.totalPage;
  },
  // domains
  getDomainsWorkspace: (state) => {
    return state.domains.domains;
  },
  getDomainsPageWorkspace: (state) => {
    return state.domains.page;
  },
  getDomainsTotalWorkspace: (state) => {
    return state.domains.total;
  },
  getDomainsTotalPageWorkspace: (state) => {
    return state.domains.totalPage;
  },
  // members
  getMembersWorkspace: (state) => {
    return state.members.members;
  },
  getMembersPageWorkspace: (state) => {
    return state.members.page;
  },
  getMembersTotalPageWorkspace: (state) => {
    return state.members.totalPage;
  },
  getMembersTotalWorkspace: (state) => {
    return state.members.total;
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
  // link
  setLinksWorkspace: (state, links) => {
    state.links.links = links;
  },
  setLinksPageWorkspace: (state, page) => {
    state.links.page = page;
  },
  setLinksTotalWorkspace: (state, total) => {
    state.links.total = total;
  },
  setLinksTotalPageWorkspace: (state, totalPage) => {
    state.links.totalPage = totalPage;
  },
  setLinksSort: (state, sort) => {
    state.links.sort = sort;
  },
  setLinksDirection: (state, direction) => {
    state.links.direction = direction;
  },
  setLinksDomainSelected: (state, domainSelected) => {
    state.links.domainSelected = domainSelected;
  },
  setLinksUserIdsSelected: (state, userIdsSelected) => {
    state.links.userIdsSelected = userIdsSelected;
  },
  // domain
  setDomainsWorkspace: (state, domains) => {
    state.domains.domains = domains;
  },
  setDomainsPageWorkspace: (state, page) => {
    state.domains.page = page;
  },
  setDomainsTotalWorkspace: (state, total) => {
    state.domains.total = total;
  },
  setDomainsTotalPageWorkspace: (state, totalPage) => {
    state.domains.totalPage = totalPage;
  },
  // member
  setMembersWorkspace: (state, members) => {
    state.members.members = members;
  },
  setMembersPageWorkspace: (state, page) => {
    state.members.page = page;
  },
  setMembersTotalWorkspace: (state, total) => {
    state.members.total = total;
  },
  setMembersTotalPageWorkspace: (state, totalPage) => {
    state.members.totalPage = totalPage;
  },
};

export const actions = {
  async setWorkspaces({ commit }, payload) {
    const token = localStorage.getItem('token');
    const { page } = payload;
    try {
      const resWorkspace = await getWorkspaces(token, page);
      const { status, data } = resWorkspace.data;
      if (status === 200) {
        const { workspaces, total, totalPage } = data;
        commit('setWorkspaces', workspaces);
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
  // link
  async setLinksWorkspace({ commit, state }, payload) {
    const token = localStorage.getItem('token');
    const { sort, direction, domainSelected, userIdsSelected } = state.links;
    const { page, id } = payload;
    try {
      const resLinks = await getLinksWorkspaces(
        token,
        id,
        page,
        sort,
        direction,
        domainSelected,
        userIdsSelected
      );
      const { status, data } = resLinks.data;
      if (status === 200) {
        const { total, totalPage, links } = data;
        commit('setLinksWorkspace', links);
        commit('setLinksTotalWorkspace', total);
        commit('setLinksTotalPageWorkspace', totalPage);
      }
    } catch (error) {
      const { status } = error.response;
      if (status === 401) {
        this.$router.push('/login');
        window.localStorage.clear();
      }
    }
  },
  // domain
  async setDomainsWorkspace({ commit }, payload) {
    const token = localStorage.getItem('token');
    const { page, id } = payload;
    try {
      const resDomains = await getDomainsWorkspace(token, id, page);
      const { status, data } = resDomains.data;
      if (status === 200) {
        const { total, totalPage, domains } = data;
        commit('setDomainsWorkspace', domains);
        commit('setDomainsTotalWorkspace', total);
        commit('setDomainsTotalPageWorkspace', totalPage);
      }
    } catch (error) {
      const { status } = error.response;
      if (status === 401) {
        this.$router.push('/login');
        window.localStorage.clear();
      }
    }
  },
  // member
  async setMembersWorkspace({ commit }, payload) {
    const token = localStorage.getItem('token');
    const { page, id } = payload;
    try {
      const resDomainWorkspace = await getMembersWorkspaces(token, id, page);
      const { status, data } = resDomainWorkspace.data;
      if (status === 200) {
        const { members, total, totalPage } = data;
        commit('setMembersWorkspace', members);
        commit('setMembersTotalWorkspace', total);
        commit('setMembersTotalPageWorkspace', totalPage);
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
