<!--

App.vue

Top-level container for page content.
[static-header]
{[intro], [TreeDisplay]}
[static-footer]

Receives pre-loaded quote, nucleus, theme collections from main.js
Controls display of the collections based on selected_theme

-->


<template>
</template>

<script>
import Quote from './components/Quote.vue'

export default {
  name: 'App',
  data() {
  },
  components: {
    Quote
  },
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
