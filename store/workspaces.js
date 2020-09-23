import { getMembersWorkspaces } from '@/services/api'

export const state = () => ({
    workspaces: [],
    links: {
        links: [],
        page: 1,
        total: 0,
        totalPage: 1,
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
    // link
    setLinksWorkspace({ commit }, links) {
        commit('setLinksWorkspace', links)
    },
    setLinksTotalWorkspace({ commit }, total) {
        commit('setLinksTotalWorkspace', total)
    },
    // domain
    setDomainsWorkspace({ commit }, domains) {
        commit('setDomainsWorkspace', domains)
    },
    setDomainsTotalWorkspace({ commit }, total) {
        commit('setDomainsTotalWorkspace', total)
    },
    // member
    async setMembersWorkspace({ commit }, payload) {
        const token = localStorage.getItem('token')
        const { page, id } = payload
        try {
            const resDomainWorkspace = await getMembersWorkspaces(
                token,
                id,
                page
            );
            const { status, data } = resDomainWorkspace.data;

            if (status === 200) {
                const { members, total, totalPage } = data;
                commit('setMembersWorkspace', members)
                commit('setMembersTotalWorkspace', total)
                commit('setMembersTotalPageWorkspace', totalPage)
            }
        } catch (error) {
            const { status } = error.response;
            if (status === 401) {
                this.$router.push('/login');
            }
        }
    },
    setMembersTotalWorkspace({ commit }, total) {
        commit('setMembersTotalWorkspace', total);
    },
}