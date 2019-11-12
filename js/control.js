/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const app = new Vue({
  el: '#app',
  data: {
    username: 'Lyumih',
    urlBase: 'https://api.github.com',
    rateLimit: null,
    user: {},
    repos: [],
    error: '',
  },
  computed: {
    issuesCount() {
      return this.repos.reduce((sum, repo) => sum + repo.open_issues, 0);
    },
  },
  mounted() {
    this.fetchRateLimit();
  },
  methods: {
    fetchAllData() {
      this.fetchUser();
      this.fetchRepos();
      this.fetchRateLimit();
    },
    async fetchUser() {
      await axios
        .get(`${this.urlBase}/users/${this.username}`)
        .then((response) => (this.user = response.data))
        .catch((error) => (this.error = error));
    },
    async fetchRepos() {
      await axios
        .get(`${this.urlBase}/users/${this.username}/repos`)
        .then((response) => (this.repos = response.data))
        .catch((error) => (this.error = error));
    },
    async fetchRateLimit() {
      await axios
        .get(`${this.urlBase}/rate_limit`)
        .then((response) => (this.rateLimit = response.data))
        .catch((error) => (this.error = error));
    },
  },
});
