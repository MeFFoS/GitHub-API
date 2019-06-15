<template>
  <div class="home">
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
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      repos: ''
    }
  },
  methods: {
    onFormSubmit () {
      this.$router.push({ name: 'search', params: { page: '1', repository: `${this.repos}` } })
    }
  }
}
</script>
