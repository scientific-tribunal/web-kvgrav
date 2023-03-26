<template>
  <nav class="navbar navbar-expand-md navbar-dark _fixed-top bg-dark">
    <div class="container container-fluid">
      <router-link class="navbar-brand" to="/">KVGrav</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">О проекте</router-link>
          </li>
<!--          <div class="dropdown">
            <a class="nav-link _btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
              Config
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item" to="/page1">Page1</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/page2">Page2</router-link>
              </li>
            </ul>
          </div>-->
        </ul>
      </div>
    </div>
  </nav>
  <router-view />
  <footer class=" border-top mt-auto">
    <div class="d-flex _flex-wrap justify-content-between align-items-center py-3 my-1 container">
      <p class="nav col-md-4 mb-0 text-muted">&copy; 2023 webcounters</p>
      <p class="nav col-md-4 mb-0 justify-content-end text-muted"><router-link class="text-reset text-decoration-none" to="/about">KVGrav</router-link>&nbsp;<span class="text-muted small">{{ versionApp() }}</span></p>
    </div>
  </footer>
</template>

<style lang="scss">
body {
  display: flex;
}

body, html {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/*nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}*/
</style>
<script lang="ts">
import { versionApp } from "@/ts/Config";
import { Tooltip } from "bootstrap";
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    versionApp() {
      return versionApp
    }
  },
  components: {},
  props: {}
})
export default class App extends Vue {
  data() {
    return {
    };
  }
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']"
    });
  }
}
</script>
