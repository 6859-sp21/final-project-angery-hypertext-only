<!--

Row.vue

Holds a collection of Quote divs, arranged horizontally and centered
Made by a Triangle
-->


<template>
<div v-for="id in idList">
  <Quote id="id" v-bind:id="id" v-bind:msg="'hello this is ' + id"> </Quote>
</div>
</template>

<script>
import Quote from './Quote.vue'

export default {
  name: "Row",
  components: {
    Quote
  },
  props: {
    idList: Array, // which quotes are in the row?
  }
}
</script>

<style scoped>

</style>