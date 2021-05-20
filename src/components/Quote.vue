<!--

Quote component

TODO: Generate info from JSON

For now, use a placeholder with an onClick handler to emit a quote-selected(id) event

-->

<!-- TODO: replace this with Kii's design -->
<template>
  <span class="quote-container" v-on:click="onClickQuote"> {{ quotesById[quoteid].fullText }} </span>
</template>

<script>
/*
TODO: a method for loading the info into the quote.
*/

/*
TODO div expands on click!
 */
export default {
  name: 'Quote',
  data() {
    return {
    }
  },
  props: {
    quoteid: Number,
  },
  inject: ['quotesById'],
  computed: {
    myQuoteJSON() {
      // go get my data

    }
  },
  methods: {
    onClickQuote () {
      console.log("quote " + this.quoteid + " was clicked")
      this.$emit('focus', this.quoteid)
    }
  }
  // TODO computed properties given the id prop
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.quote-container {
  width: 120px;
  padding: 5px;
  min-height: 60px;
  margin:20px;
  display: inline-block;
  text-align: center;
  font-size: 9pt;
  border: 1px black solid;
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
