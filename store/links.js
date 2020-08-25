export const state = () => ({
  links: [
    {
      id: 1,
      link: 'https://humanbenchmark.com/dashboard',
      shortened: 'rebrand.ly/241b7',
      click: 12,
      date: '10 days ago',
    },
    {
      id: 2,
      link: 'https://humanbenchmark.com/dashboard',
      shortened: 'rebrand.ly/241b7',
      click: 12,
      date: '10 days ago',
    },
  ],
});

export const getters = {
  getLinks: (state) => {
    return state.links;
  },
};

export const mutations = {};
