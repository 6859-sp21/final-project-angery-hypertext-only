<!--

Quote component

TODO: Generate info from JSON

For now, use a placeholder with an onClick handler to emit a quote-selected(id) event

-->

<!-- TODO: replace this with Kii's design -->
<template>
  this is a quote!
  <div class="quote-container" @clicked="onClickQuote"> {{ quotesById[quoteid].fullText }} </div>
</template>

<script>
/*
TODO: a method for loading the info into the quote.
TODO: Parent row passes the id of the quote, quote uses id to load
TODO:   the data?
*/
export default {
  name: 'Quote',
  props: {
    quoteid: Number,
  },
  inject: ['quotesById'],
  methods: {
    onClickQuote () {
      console.log("quote " + this.id + " was clicked")
      this.$emit('focus', this.id)
    }
  }
  // TODO computed properties given the id prop
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.quote-container {
  width: 200px;
  background-color: azure; /* just for development */
  padding: 10px;
  margin: 50px;
  display: inline-block;
  text-align: center;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
