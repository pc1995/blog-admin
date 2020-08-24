export default {
  namespace: 'global',

  state: {
    breadcrumbList: [],
    tabNav: []
  },

  mutations: {
    ['global/updateBreadCrumbList'](state, list) {
      state.breadcrumbList = list;
    },
    ['global/updateTabNav'](state, nav) {
      const arr = JSON.parse(JSON.stringify(state.tabNav))
      const index = state.tabNav.findIndex(item => item.path === nav.path);
      if (index > -1) return;
      arr.push(nav);
      state.tabNav = arr;
    }
  }
}
