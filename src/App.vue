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
    <triangle v-bind:all-ids="selectedQuoteIds.top" v-bind:invert="true"></triangle>
    <theme-toggle></theme-toggle>
    <triangle v-bind:all-ids="selectedQuoteIds.bottom" v-bind:invert="false"></triangle>
</template>

<script>
// 1. Get the nuclei quote Ids
// 2. Make triangles by quote Ids and quote objects


import {Nucleus, Quote} from "../build/types/phrase_typedef";
import Triangle from "./components/Triangle";
import ThemeToggle from "./components/ThemeToggle";
import dataJSON from './../json/data.json'

export default {
  name: 'App',
  setup() {
    const nucleiList = ["inclusion", "exclusion", "kids", "parents", "connected", "disconnected"]
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
    }
  },
  inject: ['currentTheme'],
  computed:
      {
        selectedQuoteIds() {
          if (this.currentTheme === "speaker") {
            return {
              top: this.allData.inclusionIds,
              bottom: this.allData.exclusionIds
            }
          } else if (this.currentTheme === "belonging") {
            return {
              top: this.allData.themes.belonging[0].quoteIds,
              bottom: this.allData.themes.belonging[1].quoteIds
            }
          } else if (this.currentTheme === "heritage") {
            return {
              top: this.allData.themes.heritage[0].quoteIds,
              bottom: this.allData.themes.heritage[1].quoteIds
            }
          } else { // "family"
            return {
              top: this.allData.themes.family[0].quoteIds,
              bottom: this.allData.themes.family[1].quoteIds
            }
          }

        },

        allData() {
          // quotesFromJSON = {"id": Quote()}
          dataJSON.forEach(x => { console.log(x["id"], x["full_text"]); });

          // Quote.vue template is responsible for loading content based on the id
          let n_Inclusion = new Nucleus("inclusion")
          let n_Exclusion = new Nucleus("exclusion")

          let n_Kids = new Nucleus("kids")
          let n_Parents = new Nucleus("parents")

          let n_Connected = new Nucleus("connected")
          let n_Disconnected = new Nucleus("disconnected")

          let n_Immigrants = new Nucleus("immigrants")
          let n_FirstGens = new Nucleus("firstgen")

          let nuclei = {
            "inclusion": n_Inclusion,
            "exclusion": n_Exclusion,
            "kids": n_Kids,
            "parents": n_Parents,
            "connected": n_Connected,
            "disconnected": n_Disconnected,
            "immigrant": n_Immigrants,
            "firstgen": n_FirstGens
          }

          // themes["belonging].nuclei to see what to display
          let themes = {
            "belonging": [n_Exclusion, n_Inclusion],
            "family": [n_Kids, n_Parents],
            "heritage": [n_Connected, n_Disconnected],
            "speaker": [n_Immigrants, n_FirstGens]
          }

          //  a dictionary keyed by id. Then append ids to the correct
          //  nuclei lists
          // {id: Quote()}
          let quotesById = {}

          dataJSON.forEach(phrase => {
            if ("nuclei" in phrase) {
              console.log("phrase: ", phrase.nuclei)
              phrase["nuclei"].forEach(word => {
                    nuclei[word].quoteIds.push(phrase["id"])
                  }
              );
            }
            quotesById[phrase["id"]] =
                new Quote(phrase["id"],
                    phrase["speaker"],
                    phrase["full_text"],
                    phrase["timestamp"],
                    phrase["nuclei"]);
          });


          console.log("----- main.js: LOADED QUOTE DATA -----")
          console.log("n_Inclusion: ", n_Inclusion)
          console.log("n_Exclusion: ", n_Exclusion)
          console.log("All themes: ", themes)

          return {
            inclusionIds: n_Inclusion.quoteIds,
            exclusionIds: n_Exclusion.quoteIds,
            quotesById: quotesById,
            themes: themes
          }
        },

      },
  methods: {

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
