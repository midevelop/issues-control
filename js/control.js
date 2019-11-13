/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const app = new Vue({
  el: '#app',
  data: {
    username: 'midevelop',
    isAuthBasic: true,
    password: '',
    urlBase: 'https://api.github.com',
    rateLimit: null,
    user: {},
    repos: [],
    error: '',
    page: 1,
    owner: 'Elbrus-Bootcamp',
  },
  computed: {
    issuesCount() {
      return this.repos.reduce((sum, repo) => sum + repo.open_issues, 0);
    },
    basicAuth() {
      if (this.isAuthBasic) {
        const encodedString = `${this.username}:${this.password}`;
        return {
          Authorization: `Basic ${btoa(encodedString)}`,
        };
      }
      return {};
    },
  },
  mounted() {
    this.fetchRateLimit();
  },
  methods: {
    fetchAllData() {
      if (this.password) {
        this.error = '';
        // this.fetchUser();
        this.fetchRepos();
        this.fetchRateLimit();
      } else {
        this.error = 'Введите пароль';
      }
    },
    async fetchUser() {
      await axios
        .get(`${this.urlBase}/users/${this.username} `, {
          headers: this.basicAuth,
        })
        .then((response) => (this.user = response.data))
        .catch((error) => (this.error = error));
    },
    async fetchRepos() {
      await axios
        .get(`${this.urlBase}/orgs/${this.owner}/repos?per_page=100&type=private&page=${this.page}`, {
          headers: this.basicAuth,
        })
        .then((response) => (this.repos = response.data))
        .catch((error) => (this.error = error));
    },
    async fetchRateLimit() {
      await axios
        .get(`${this.urlBase}/rate_limit`, {
          headers: this.basicAuth,
        })
        .then((response) => (this.rateLimit = response.data))
        .catch((error) => (this.error = error));
    },
  },
});
