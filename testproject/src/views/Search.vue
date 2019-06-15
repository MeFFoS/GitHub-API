<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <form @submit.prevent="onFormSubmit()">
            <div class="form-group">
              <label for="repos">Список forks</label>
              <input type="text" class="form-control" id="repos" aria-describedby="repos" placeholder="owner/repositoryName" v-model="repos">
              <small id="reposHelp" class="form-text text-muted">Введите имя репозитория в виде: owner/repositoryName</small>
            </div>
            <button type="submit" class="btn btn-primary">Найти</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h1>Список форков</h1>
            <table class="table table-bordered table-hover">
              <thead>
              <tr>
                <th>Название репозитория</th>
                <th>Владелец</th>
                <th>Кол-во звезд</th>
                <th>Ссылка</th>
              </tr>
              </thead>
              <transition-group tag="tbody" name="slide" mode="out-in">
                <tr v-for="fork in forks" v-bind:key="fork.owner.login">
                  <td>{{ fork.full_name }}</td>
                  <td>{{ fork.owner.login }}</td>
                  <td>{{ fork.stargazers_count }}</td>
                  <td><a :href="fork.html_url">{{ fork.html_url }}</a></td>
                </tr>
              </transition-group>
            </table>
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <template v-for="number in pages">
                <li :class="activePage(number)" :key="number" @click="changePage(number)"><a class="page-link" href="#">{{ number}}</a></li>
              </template>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'search',
  data () {
    return {
      repos: ''
    }
  },
  computed: {
    ...mapGetters(['forks', 'pages'])
  },
  methods: {
    ...mapActions(['loadForks']),
    onFormSubmit () {
      this.$router.push({ name: 'search', params: { page: '1', repository: `${this.repos}` } })
    },
    activePage (number) {
      if (number === parseInt(this.$route.params.page)) return 'page-item active'
      else return 'page-item'
    },
    changePage (number) {
      this.$router.push({ name: 'search', params: { page: number, repository: this.$route.params.repository } })
    }
  },
  mounted () {
    this.loadForks({ repos: this.$route.params.repository, page: this.$route.params.page })
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.loadForks({ repos: this.$route.params.repository, page: this.$route.params.page })
  }
}
</script>
<style>
  .slide-enter{

  }

  .slide-enter-active{
    animation: slideIn 0.5s;
  }

  .slide-enter-to{

  }

  .slide-leave{

  }

  .slide-leave-active{
    animation: slideOut 0.5s;
  }

  .slide-leave-to{

  }

  @keyframes slideIn{
    from{transform: rotateY(90deg);}
    to{transform: rotateY(0deg);}
  }

  @keyframes slideOut{
    from{transform: rotateY(0deg);}
    to{transform: rotateY(90deg);}
  }
</style>
