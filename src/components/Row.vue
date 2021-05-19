<!--

Row.vue

Holds a collection of Quote divs, arranged horizontally and centered
Made by a Triangle
-->


<template>
<div class="row-container" v-for="id in idList" v-bind:key="id">
  row!
  <Quote v-bind:quoteid="id" v-bind:msg="'hello this is ' + id"> </Quote>
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
.row-container {
  display: inline-block;
  text-align: center;
  background-color: coral;
}
</style>