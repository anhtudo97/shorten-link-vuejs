export const state = () => ({
  notifications: [
    {
      id: 1,
      name: 'Workspace name',
      Workspace_id: 1432,
      createdAt: '2020-08-26T10:10:25.704675+07:00',
    },
    {
      id: 2,
      name: 'Workspace name 2',
      Workspace_id: 123,
      createdAt: '2020-08-27T10:10:25.704675+07:00',
    },
  ],
});

export const getters = {
  getNotifications: (state) => {
    return state.notifications;
  },
};
