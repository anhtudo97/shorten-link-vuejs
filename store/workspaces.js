export const state = () => ({
  Workspaces: [
    {
      id: 1,
      name: 'Workspace name',
      createdAt: '2020-08-26T10:10:25.704675+07:00',
    },
    {
      id: 2,
      name: 'Workspace name 2',
      createdAt: '2020-08-27T10:10:25.704675+07:00',
    },
  ],
});

export const getters = {
  getWorkspaces: (state) => {
    return state.Workspaces;
  },
};
