<!--

App.vue

Top-level container for page content.
[static-header]
{[intro], [TreeDisplay]}
[static-footer]

-->


<template>
  <Quote msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Quote from './components/Quote.vue'

export default {
  name: 'App',
  components: {
    Quote
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
