var app = new Vue({
  el: '#app',
  data: {
    username: 'midevelop',
    urlBase: 'https://api.github.com',
    user: {},
    repos: [],
    error: ''
  },
  computed: {
    issuesCount() {
      return this.repos.reduce((sum, repo) => sum + repo.open_issues, 0);
    }
  },
  methods: {
    fetchAllData() {
      this.fetchUser();
      this.fetchRepose();
    },
    fetchUser() {
      axios
        .get(`${this.urlBase}/users/${this.username}`)
        .then(response => (this.user = response.data))
        .catch(error => (this.error = error));
    },
    fetchRepose() {
      axios
        .get(`${this.urlBase}/users/${this.username}/repos`)
        .then(response => (this.repos = response.data))
        .catch(error => (this.error = error));
    }
  }
});
