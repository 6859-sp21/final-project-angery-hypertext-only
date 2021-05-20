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
  <div id="panzoom">
    <triangle v-bind:all-ids="selectedQuoteIds.top" v-bind:invert="true"></triangle>
    <theme-toggle></theme-toggle>
    <triangle v-bind:all-ids="selectedQuoteIds.bottom" v-bind:invert="false"></triangle>
  </div>
</template>

<script>
// 1. Get the nuclei quote Ids
// 2. Make triangles by quote Ids and quote objects


import {Nucleus, Quote} from "../build/types/phrase_typedef";
import Triangle from "./components/Triangle";
import ThemeToggle from "./components/ThemeToggle";

export default {
  name: 'App',
  setup() {
      const nucleiList = ["family", "parents", "mom", "mother", "father", "kids", "States", "America", "China", "Spanish", "Venezuelan", "Venezuela", "connection", ""]
      return {
        nucleiList
      }
  },
  data() {
    return {}
  },
  components: {
    triangle: Triangle,
    themeToggle: ThemeToggle
  },
  provide() {
    return {
      quotesById: this.allData.quotesById,
      themes: this.allData.themes,
      quotesFromJSON: {}
    }
  },
  inject: ['currentTheme'],
  computed:
      {
        allData() {
          return this.loadAll()
        },
        selectedQuoteIds() {
          if (this.currentTheme === "speaker") {
            return {
              top: this.allData.inclusionIds,
              bottom: this.allData.exclusionIds
            }
          } else {
            return {
              top: this.allData.inclusionIds,
              bottom: this.allData.exclusionIds
            }
          }

        }
      },
  methods: {
    loadAll() {

      // Quote.vue template is responsible for loading content based on the id
      // define themes and nuclei
      // put these in an array or dict when loading all the json?
      let n_Inclusion = new Nucleus("inclusion")
      let n_Exclusion = new Nucleus("exclusion")

      let n_Kids = new Nucleus("kids")
      let n_Parents = new Nucleus("parents")

      let n_Connected = new Nucleus("connected")
      let n_Disconnected = new Nucleus("disconnected")

      let n_Immigrants = new Nucleus("immigrants")
      let n_FirstGens = new Nucleus("firstgen")

      // TODO redo this eventually to use the types
      // themes["belonging].nuclei to see what to display
      let themes = {
        "belonging": [n_Exclusion, n_Inclusion],
        "family": [n_Kids, n_Parents],
        "heritage": [n_Connected, n_Disconnected],
        "speaker": [n_Immigrants, n_FirstGens]
      }

      let quotes = this.makeAllQuotes()
      console.log("App.vue: makeAllQuotes(): \n", quotes)

      // load json and generate Quote objects, put them in
      //  a dictionary keyed by id. Then append ids to the correct
      //  nuclei lists


      console.log("----- main.js: LOADED QUOTE DATA -----")
      console.log("All quotes: ", quotes)
      console.log("n_Inclusion: ", n_Inclusion)
      console.log("n_Exclusion: ", n_Exclusion)
      console.log("All themes: ", themes)

      return {
        inclusionIds: n_Inclusion.quoteIds,
        exclusionIds: n_Exclusion.quoteIds,
        quotesById: quotes,
        themes: themes
      }
    },

    startTimer() {
      return new Date();
    },

    loadJSON(callback) {
      //https://www.geekstrick.com/load-json-file-locally-using-pure-javascript/
      var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', '../json/data.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState === 4 && xobj.status === "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
      };
      xobj.send(null);
    },

    makeAllQuotes() {
      this.loadJSON(function(response) {
        let phrases = JSON.parse(response);
        console.log("App.vue:makeAllQuotes() phrases = ", phrases)
        phrases.forEach(phrase => {
          let nucleusWords = [];
          phrase["timestamp"].forEach(item => {
            if (this.nucleiList.includes(item["word"])) {
              nucleusWords.push(item["word"]);
            }
          });
          this.quotesFromJSON[phrase["id"]] = new Quote(phrase["id"], phrase["speaker"], phrase["full_text"], phrase["timestamp"], nucleusWords);
        });
      });
    }
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
