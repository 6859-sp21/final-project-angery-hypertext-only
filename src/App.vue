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
  hello
<triangle v-bind:all-ids="allData.inclusionIds" v-bind:invert="false"></triangle>
</template>

<script>
// 1. Get the nuclei quote Ids
// 2. Make triangles by quote Ids and quote objects


import {Nucleus, Quote} from "../build/types/phrase_typedef";
import Triangle from "./components/Triangle";

export default {
  name: 'App',
  data() {
    return {
    }
  },
  components: {
    triangle: Triangle
  },
  provide() {
    return {
      quotesById: this.allData.quotesById
    }
  },
  computed: {
    allData() {
      return this.loadAll()
    },
  },
  methods:{
    loadAll(){

    // Quote.vue template is responsible for loading content based on the id
    // define themes and nuclei
    // put these in an array or dict when loading all the json?
      let n_Inclusion = new Nucleus("inclusion")
      let n_Exclusion = new Nucleus("exclusion")

    // themes["belonging].nuclei to see what to display
      let themes = {
        "belonging" : [n_Exclusion, n_Inclusion]
      }

      let quotes = {}

    // load json and generate Quote objects, put them in
    //  a dictionary keyed by id. Then append ids to the correct
    //  nuclei lists


    // dummy quotes with just speaker, fulltext, id
      for (let i = 0; i < 30; i++ ) {
        let speaker = i%2 === 0 ? "immigrant" : "firstgen"
        let nuc_names = []
        if (i%3 === 0) {
          nuc_names.push("inclusion")
          speaker === "immigrant" ?
              n_Inclusion.quoteIds.unshift(i) : n_Inclusion.quoteIds.push(i)
        }
        else if (i%3 === 1) {
          nuc_names.push("exclusion")
          speaker === "immigrant" ?
              n_Exclusion.quoteIds.unshift(i) : n_Exclusion.quoteIds.push(i)
        }
        else if (i%3 ===2) {
          nuc_names.push("inclusion")
          nuc_names.push("exclusion")
          speaker === "immigrant" ?
              n_Inclusion.quoteIds.unshift(i) : n_Inclusion.quoteIds.push(i)

          speaker === "immigrant" ?
              n_Exclusion.quoteIds.unshift(i) : n_Exclusion.quoteIds.push(i)
        }
        let fullText = "This is quote with id = " + i + " speaker = " + speaker + " nuclei = " + JSON.stringify(nuc_names)
        quotes[i] = new Quote(i, speaker, fullText)
      }
      console.log("----- main.js: LOADED QUOTE DATA -----")
      console.log("All quotes: ", quotes)
      console.log("n_Inclusion: ", n_Inclusion)
      console.log("n_Exclusion: ", n_Exclusion)
      console.log("All themes: ", themes)

      return {
        inclusionIds: n_Inclusion.quoteIds,
        exclusionIds: n_Exclusion.quoteIds,
        quotesById: quotes
      }
    }
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
