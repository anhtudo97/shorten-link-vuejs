import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
  slots: {
    noResults: '',
    noMore: '', // you can pass a string value
  },
});
Vue.component('infinite-loading', InfiniteLoading);
