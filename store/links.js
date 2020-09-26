import { getLinks } from '@/services/api'

export const state = () => ({
    sort: 'created_at',
    direction: 'DESC',
    links: [],
    total: 0,
    totalPage: 1,
    domainSelected: [],
    workspaceSelected: [],
});

export const getters = {
    getLinks: (state) => {
        return state.links;
    },
    getTotal: (state) => {
        return state.total;
    },
    getTotalPage: (state) => {
        return state.totalPage;
    },
    getSort: (state) => {
        return state.sort;
    },
    getDirection: (state) => {
        return state.direction;
    },
    getDomainSelected: (state) => {
        return state.domainSelected;
    },
    getWorkspaceSelected: (state) => {
        return state.workspaceSelected;
    },
};

export const mutations = {
    updateLinks: (state, links) => {
        state.links = links;
    },
    setSort: (state, sort) => {
        state.sort = sort;
    },
    setTotal: (state, total) => {
        state.total = total;
    },
    setTotalPage: (state, totalPage) => {
        state.totalPage = totalPage;
    },
    setDirection: (state, direction) => {
        state.direction = direction;
    },
    setDomainSelected: (state, domainSelected) => {
        state.domainSelected = domainSelected;
    },
    setWorkspaceSelected: (state, workspaceSelected) => {
        state.workspaceSelected = workspaceSelected;
    },
};

export const actions = {
    async updateLinks({ commit, state }, payload) {
        const token = localStorage.getItem('token')
        const {
            sort,
            direction,
            domainSelected,
            workspaceSelected
        } = state
        const {
            page,
            name = ''
        } = payload
        try {
            const resLink = await getLinks(
                token,
                page,
                sort,
                direction,
                domainSelected,
                workspaceSelected,
                name
            );

            const { status, data } = resLink.data;
            if (status === 200) {
                const { links, total, totalPage } = data;
                commit('updateLinks', links)
                commit('setTotal', total)
                commit('setTotalPage', totalPage)
            }
        } catch (error) {
            const { status } = error.response;
            if (status === 401) this.$router.push('/login');
        }
    }
};
