import axios from 'axios';
// const API_URL = process.env.API_URL || 'http://localhost:3000';
// const API_URL = process.env.WEB_API_URL || 'https://api.shorten.godmerch.com';
const api = axios.create({
    baseURL: `http://139.180.213.253`,
});
// const client = axios.create({
//   baseURL: `${API_URL}/api`,
// });

// export const createNewUser = (
//   fullName,
//   email,
//   password,
//   gender,
//   dateOfBirth
// ) => {
//   return client.post('user/sign-up', {
//     fullName,
//     email,
//     password,
//     gender,
//     dateOfBirth,
//   });
// };

// export const loginUser = (email, password) => {
//   return client.post('user/sign-in', {
//     email,
//     password,
//   });
// };

// export const getLinks = (token) => {
//   return client.post('link/links', { token });
// };

// export const createNewDomain = (token, name) => {
//   return client.post('domain/domains', { token, name });
// };

export const createNewUser = (
    fullName,
    email,
    password,
    gender,
    dateOfBirth
) => {
    return api.post('auth/sign-up', {
        fullName,
        email,
        password,
        gender,
        dateOfBirth,
    });
};

export const loginUser = (email, password) => {
    return api.post('auth/sign-in', {
        email,
        password,
    });
};

/* Link */
export const getLinks = (
    token,
    page,
    sort = 'created_at',
    direction = 'DESC',
    domainIds = [],
    workspaceIds = [],
    search = ''
) => {
    return api.get(
        `/links?page=${page}&perPage=10&sort=${sort}&direction=${direction}&domainIds=${domainIds}&workspaceIds=${workspaceIds}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getLink = (token, id) => {
    return api.get(`/links/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getTitleUrl = (url) => {
    return api.get(`/url-meta?url=${url}`);
};

export const getSlashTag = (url) => {
    return api.get(`/links/generate?destination=f${url}`);
};

export const checkSlashTag = (slash) => {
    return api.get(`/links/exists?slashtag=${slash}`);
};

export const createNewLink = (
    token,
    destination,
    domainId,
    slashtag,
    title,
    workspaceId
) => {
    return api.post(
        `/links`, {
            destination,
            domainId,
            slashtag,
            title,
            workspaceId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteLink = (token, id) => {
    return api.delete(`/links/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateLink = (
    token,
    id,
    destination,
    domainId,
    slashtag,
    title
) => {
    return api.put(
        `/links/${id}`, {
            destination,
            domainId,
            slashtag,
            title,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

/* Domain */
export const createNewDomain = (token, name) => {
    return api.post(
        `/domains`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getDomains = (token, page, withDefault = false, perpage = 10) => {
    return api.get(
        `/domains?page=${page}&perPage=${perpage}&withDefault=${withDefault}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getDomain = (token, id) => {
    return api.get(`/domains/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteDomain = (token, id) => {
    return api.delete(`/domains/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

/* Workspace */
export const createNewWorkspace = (token, name) => {
    return api.post(
        `/workspaces`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getWorkspaces = (token, page) => {
    return api.get(`/workspaces?page=${page}&perPage=10`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getWorkspacesJoined = (token, page) => {
    return api.get(`/joined-workspaces?page=${page}&perPage=10`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateWorkspace = (token, id, name) => {
    return api.put(
        `/workspaces/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const deleteWorkspace = (token, id) => {
    return api.delete(`/workspaces/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getDomainsWorkspace = (token, workspaceId, page, status = false, perpage = 10) => {
    return api.get(`/workspaces/${workspaceId}/domains?page=${page}&perPage=${perpage}&withDefault=${status}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addDomainsWorkspace = (token, workspaceId, domainIds) => {
    return api.post(
        `/workspaces/${workspaceId}/domains`, { domainIds }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getLinksWorkspaces = (
    token,
    workspaceId,
    page,
    sort = 'created_at',
    direction = 'DESC',
    domainIds = [],
    userIds = []
) => {
    return api.get(
        `workspaces/${workspaceId}/links?page=${page}&perPage=10&sort=${sort}&direction=${direction}&domainIds=${domainIds}&userIds=${userIds}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getMembersWorkspaces = (token, workspaceId, page) => {
    return api.get(`workspaces/${workspaceId}/members?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getMember = (token, search) => {
    return api.get(`users?email=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const removeDomainWorkspace = (token, workspaceId, domainId) => {
    return api.delete(
        `workspaces/${workspaceId}/domains/${domainId}?deleteLink=false`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const inviteMembers = (token, workspaceId, userIds) => {
    return api.post(
        `workspaces/${workspaceId}/invite`, { userIds }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const getInvitations = (token, page = 1) => {
    return api.get(`workspace-invitations?page=${page}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const answerInvitations = (token, invitationId, status = 'ACCEPTED') => {
    return api.put(
        `workspace-invitations/${invitationId}`, { status }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const removeMemberWorkspace = (token, workspaceId, userId) => {
    return api.delete(`workspaces/${workspaceId}/members/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
