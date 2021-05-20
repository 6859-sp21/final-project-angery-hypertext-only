<!--

Triangle.vue

Generates Row.vue given a list of input quote ids, ordered. Starts from top of triangle
with width 3, then width 4, ...

-->



<template>
<div class="row-container" v-for="content in rowContentArray" v-bind:key="content.length">
  <Row v-bind:id-list="content"></Row>
</div>
</template>

<script>
import Row from "./Row.vue"

// Parent layout will filter the ids by nucleus that belong here!
// I think Vue's reactivity might already make the transition graceful?

export default {
  name: "Triangle",
  props: {
    allIds: Array,
    invert: Boolean
  },
  components: {Row},
  computed: {
    // make array of row content, ordered
    //   eg [[id0],
    //    [id1, id2],
    //  [id3, id4, id5]]
    // use v-for to iterate through array and make row components

    rowContentArray() {
      console.log("triangle allIds: ", this.allIds)
      let width = 3 // elements in first row
      let rows = []

      let idx = 0 // current element in ids
      let currentRow = []
      while (idx < this.allIds.length) {
        if (currentRow.length < width) {
          currentRow.push(this.allIds[idx])
          idx++
        } else {
          rows.push(JSON.parse(JSON.stringify(currentRow)))
          currentRow = []
          width++
        }
      }

      rows.push(JSON.parse(JSON.stringify(currentRow)))
      if (this.invert) {rows.reverse()}
      return rows
    }
  }
}

</script>

<style scoped>

.triangle-container {
  text-align: center;
  background-color: darkgrey;
  width: 100%
}

</style>