<!--

Quote component

TODO: Generate info from JSON

For now, use a placeholder with an onClick handler to emit a quote-selected(id) event

-->

<template>
  <span class="quote-box">
    {{myQuoteObj}}
  <span class="quote-container">
    <div class="container-column" id="container-video"></div>
    <div class="container-column" id="container-quote">
      <h1 id="quote"> </h1>
      <h1 id="quote2"></h1>
    </div>
  </span>
  </span>

</template>

<script>
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
    myQuoteObj() {
      console.log("my quoteObj: ", this.quotesById[this.quoteid])
      return this.quotesById[this.quoteid]
    }
  },
  methods: {
    onClickQuote() {
      console.log("quote " + this.quoteid + " was clicked")
      this.$emit('focus', this.quoteid)
    },

    char(container, char) {
      // TODO need this to be dynamic
      let span = document.createElement("span");
      span.setAttribute('data-word', char);
      span.innerText = char;
      container.appendChild(span);

      this.update = function(args) {
        this.wdth = args.wdth;
        this.wght = args.wght;
        this.alpha = args.alpha;
        this.ital = args.ital;
        this.cap = args.cap;
        this.size = args.size;
        this.draw();
      }

      this.draw = function() {
        var style = "visibility: visible;";
        style += "opacity: " + this.alpha + ";";
        style += "font-size: " + this.size + ";";
        style += "font-variation-settings: 'wght' " + this.wght + ", 'wdth' " + this.wdth + ", 'ital' " + this.ital + ";";
        if (this.cap === true) {style += "text-transform: uppercase;"}
        span.style = style;
      }
    },



  }
  // TODO computed properties given the id prop
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

Quote {
  background-color: darkgrey;
}

@font-face {
  src: url('../../fonts/CompressaPRO-GX.woff2');
  font-family:'Compressa VF';
  font-style: normal;
}

@font-face {
  font-family: 'FF Meta VF';
  src: url('https://variablefonts.monotype.com/MetaVariableDemo-Set.woff2') format('woff2');
  font-display: swap;
  font-style:  italic;
  font-weight: 200 900;
}

@font-face {
  font-family: "Venn VF";
  src: url("../../fonts/Venn_VF.woff2") format("woff2-variations"),
  url("../../fonts/Venn_VF.woff2") format("woff2");
  font-display: fallback;
  font-weight: 100 800;
  font-stretch: 75% 125%;
  font-style: normal;
}

@font-face {
  font-family: "Newsreader";
  src: url("../../fonts/Amstelvar-Roman.ttf");
}

span {
  visibility: hidden;
  opacity: 0;
  transition: all 1.5s;
}

/* span:hover {
	font-weight: 800;
} */

.quote-container {
  text-rendering: optimizeSpeed;
  font-size: 50px;
  color: black;
  width: auto;
  display: flex;
  float: right;
  line-height: 1.5em;
  margin: 0 auto;
}

#container-quote {
  /* text-align: left; */
  float: right;
  width: 75%;
}

#container-video {
  float: left;
  width: 600px;
  align-content: center;
  align-items: center;
}

#container-video video {
  width: 400px;
  height: 400px;
  padding: 100px;
  border-radius: 400px;
  object-fit: cover;
  filter: invert(5%);
  opacity: 0.5;
}

video:hover {
  background: radial-gradient(rgba(255,255,0,0.6), rgba(255,255,0,0) 70%);
  transition: all 2s;
}
</style>
