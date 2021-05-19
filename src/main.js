import {createApp} from 'vue'
import App from './App.vue'
import {Nucleus, Quote, Theme} from "../build/types/phrase_typedef";
import plugin from "./plugin.js.old";

/************
 *
 * main.js
 * Entry point for vue app
 *
 * Build and serve with "npm run serve"
 *
 ************/

// Quote.vue template is responsible for loading content based on the id
// define themes and nuclei
// put these in an array or dict when loading all the json?
let n_Inclusion = new Nucleus("inclusion")
let n_Exclusion = new Nucleus("exclusion")
let t_Belonging = new Theme("belonging", [n_Exclusion, n_Inclusion])

// themes["belonging].nuclei to see what to display
let themes = {
    "belonging" : t_Belonging
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


// controller is in App.vue, TreeDisplay reacts to global theme setting in App.vue
// This is a global mixin, it is applied to every vue instance.
// Mixins must be instantiated *before* your call to new Vue(...)
const app = createApp(App)
app.use(plugin, {option: "option"})
app.mount('#app')
