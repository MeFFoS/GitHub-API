import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forks: [],
    pages: 0
  },
  getters: {
    forks (state) {
      return state.forks
    },
    pages (state) {
      return state.pages
    }
  },
  mutations: {
    loadForks (state, payload) {
      state.forks = payload
    },
    setPages (state, payload) {
      state.pages = payload
    }
  },
  actions: {
    loadForks (store, payload) {
      let perPage = 3
      axios
        .get(`http://meffos-test.herokuapp.com/api/${payload.repos}/forks?page=${payload.page}&per_page=${perPage}`)
        .then(response => (store.commit('loadForks', response.data)))
        .catch(error => console.log(error))
      axios
        .get(`http://meffos-test.herokuapp.com/api/${payload.repos}`)
        .then(response => {
          let pages = Math.ceil(response.data.forks / perPage)
          store.commit('setPages', pages)
        })
        .catch(error => console.log(error))
    }
  }
})
