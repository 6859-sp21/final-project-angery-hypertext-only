import { createApp } from 'vue'
import App from './App.vue'
import {Quote, Speaker, Theme, Nucleus} from "../build/types/phrase_typedef";


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

// load json and generate Quote objects, put them in
//  a dictionary keyed by id. Then append ids to the correct
//  nuclei lists

let quotes = {}

// dummy quotes with just speaker, fulltext, id
for (let i = 0; i < 30; i++ ) {
    let speaker = i%2 === 0 ? Speaker.Immigrant : Speaker.FirstGen
    let nuclei = []
    if (i%3 === 0) {
        nuclei.push(n_Inclusion)
        speaker === Speaker.Immigrant ?
            n_Inclusion.quoteIds.unshift(i) : n_Inclusion.quoteIds.push(i)
    }
    else if (i%3 === 1) {
        nuclei.push(n_Exclusion)
        speaker === Speaker.Immigrant ?
            n_Exclusion.quoteIds.unshift(i) : n_Exclusion.quoteIds.push(i)
    }
    else if (i%3 ===2) {
        nuclei.push(n_Exclusion); nuclei.push(n_Inclusion)
        speaker === Speaker.Immigrant ?
            n_Inclusion.quoteIds.unshift(i) : n_Inclusion.quoteIds.push(i)

        speaker === Speaker.Immigrant ?
            n_Exclusion.quoteIds.unshift(i) : n_Exclusion.quoteIds.push(i)
    }
    let fullText = "This is quote with id = " + i + " and nuclei " + JSON.stringify(nuclei)
    let q = new Quote(i, speaker, fullText)
    q.nuclei = nuclei
    quotes[i] = q
}
console.log("----- main.js: LOADED QUOTE DATA -----")
console.log("All quotes: " + JSON.stringify(quotes))
console.log("n_Inclusion: " + JSON.stringify(n_Inclusion))
console.log("n_Exclusion: " + JSON.stringify(n_Exclusion))
console.log("All themes: " + JSON.stringify(themes))


// controller is in App.vue, TreeDisplay reacts to global theme setting in App.vue
// This is a global mixin, it is applied to every vue instance.
// Mixins must be instantiated *before* your call to new Vue(...)

const app = createApp(App).mount('#app')

// inject a handler for `myOption` custom option
app.mixin({
    data() {
        return {
            quotes: quotes,
            themes: themes
        }
    },
    created() {
        console.log("Mounted the mixin!")
    }
})