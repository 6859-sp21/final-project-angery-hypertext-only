import {createApp, h} from 'vue'
import App from './App.vue'

/************
 *
 * main.js
 * Entry point for vue app
 *
 * Build and serve with "npm run serve"
 *
 ************/

import panZoom from 'vue-panzoom'

// controller is in App.vue, TreeDisplay reacts to global theme setting in App.vue
// This is a global mixin, it is applied to every vue instance.
// Mixins must be instantiated *before* your call to new Vue(...)
const app = createApp(App)

app.use(panZoom)
app.mount('#app')

const zoom = createApp({})

zoom.component('anchored-heading', {
    render() {
        return h(App)
    }
})