<!--

Row.vue

Holds a collection of Quote divs, arranged horizontally and centered
Made by a Triangle
-->


<template>
<div class="row-container">
  <Quote v-bind:quoteid="id"  v-for="id in idList" v-bind:key="id"> </Quote>
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
  text-align: center;
  width:100%
}
</style>