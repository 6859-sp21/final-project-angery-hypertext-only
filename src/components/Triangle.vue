<!--

Triangle.vue

Generates Row.vue given a list of input quote ids, ordered. Starts from top of triangle
with width 3, then width 4, ...

-->



<template>
<div v-for="content in rowContentArray">
  <Row v-bind:id-list="content"></Row>
</div>
</template>

<script>
import Row from "./Row.vue"

export default {
  name: "Triangle",
  props: {
    ids: Array,
    upsideDown: Boolean
  },
  components: {Row},
  computed: {
    // make array of row content, ordered
    //   eg [[id0],
    //    [id1, id2],
    //  [id3, id4, id5]]
    // use v-for to iterate through array and make row components
    rowContentArray() {
      let width = 3 // elements in first row
      let rows = []

      let idx = 0 // current element in ids
      let currentRow = []
      while (idx < this.ids.length) {
        if (currentRow.length <= width) {
          currentRow.push(this.ids[idx])
          idx++
        } else {
          rows.push(currentRow)
          console.log("pushed row: " + JSON.stringify(currentRow))
          currentRow = []
          width++
          idx = 0
        }
      }
      console.log("triangle last row has width = " + width)
      if (this.upsideDown) {rows.reverse()}
      return rows
    }
  }
}

// TODO how to break up the ids and pass those to row?

</script>

<style scoped>

</style>