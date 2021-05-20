<!--

Quote component

TODO: Generate info from JSON

For now, use a placeholder with an onClick handler to emit a quote-selected(id) event

-->

<template>
  <div class="quote-box"  v-on:click="onClick"
       :class="active ? 'active' : 'inactive'">
  <div class="quote-container">
    <div class="container-video">
      <video :class="active ? 'active' : 'inactive'" :id="'video-'+quoteid">
        <source :src="'static/'+ quoteid + '.mp4#t=0'" type='video/mp4'>
      </video>
    </div>
    <div class="container-quote" :id="'container-quote-'+quoteid">
      <div v-if="!active" :class="'static-quote-'+myQuoteObj.speaker">{{myQuoteObj.fullText}}</div>
      <div class="quote-animation" :id="'quote-animation-'+quoteid"></div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: 'Quote',
  data() {
    return {
      active: false,
    }
  },
  props: {
    quoteid: Number,
  },
  emits: ["quoteClicked"],
  inject: ['quotesById', 'activeQuoteId'],
  computed: {
    myQuoteObj() {
      return this.quotesById[this.quoteid]
    }
  },
  methods: {

    onClick() {
      this.$emit("quoteClicked", this.quoteid)
      if (!this.active) {
        this.active = true
        this.animateQuote()
        // emit a clicked so others know to close
      } else {
        this.collapseQuote()
      }
    },

    collapseQuote() {
      this.active = false

      let videoFrame = document.getElementById("video-" + this.quoteid);
      videoFrame.pause();
      videoFrame.currentTime = 0;
      document.getElementById("quote-animation-" + this.quoteid).innerHTML = ''
    },

    animateQuote() {
      this.active = true
      let quote = this.myQuoteObj
      console.log("hello from", quote.id)
      const frameRate = 60;
      let Char = function(container, char) {
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
      }


      let chars = []
      let speaker, timestamp;
      speaker = quote.speaker;
      timestamp = quote.timestamp;

      // let count = 0, text = "", wordIndex = [], wordLetterCount = 0;
      let quoteContainer = document.getElementById("quote-animation-" + this.quoteid);

      if (speaker === "immigrant"){
        quoteContainer.style.fontFamily = "Newsreader";
      } else {
        quoteContainer.style.fontFamily = "Compressa VF";
      }

      for (let i = 0; i < timestamp.length; i++){
        let _char = new Char(quoteContainer, timestamp[i]["word"] + " ");
        chars.push(_char);
      }

      //play video
      let videoFrame = document.getElementById("video-" + this.quoteid);

      // videoFrame.onclick = function() {
        let startTime = new Date()
        videoFrame.play();
        let wordIndexNow, wordIndexPrev;

        let timer = setInterval(function(){
          wordIndexPrev = wordIndexNow;
          let timeNow = new Date();
          let timeElapsed = (timeNow - startTime)/1000;

          //video blinking anim when playing
          videoFrame.style = "background: radial-gradient(rgba(255,255,0,"
              + String(0.5 + Math.sin(timeElapsed*10)/5) + "), rgba(255,255,0,0) 80%);"

          for (let i = 0; i < timestamp.length; i++){
            if (timeElapsed > timestamp[i]["startTime"]){ wordIndexNow = i; }
          }

          if (wordIndexPrev !== wordIndexNow) {
            console.log(String(wordIndexNow) + "th word:" + timestamp[wordIndexNow]["word"]);
            let width = Math.round(10 * (timestamp[wordIndexNow]["endTime"] - timestamp[wordIndexNow]["startTime"]) / timestamp[wordIndexNow]["word"].length) * 100 + 100;
            let ital = (wordIndexNow !== 0)?
                Math.round(10 * (timestamp[wordIndexNow]["startTime"] - timestamp[wordIndexNow - 1]["startTime"]) / timestamp[wordIndexNow]["word"].length) : width;
            let weight = timestamp[wordIndexNow]["weight"] * 200 + 150;
            let cap = (timestamp[wordIndexNow]["weight"] > 3);
            chars[wordIndexNow].update({"wdth": width, "wght": weight, "alpha": 1, "ital": ital, "cap": cap, "size": weight/2});

            let resetIndex = (wordIndexNow < timestamp.length - 2)? ((wordIndexNow > 2)? wordIndexNow - 2: 0): wordIndexNow + 1;

            for (let j = 0; j < resetIndex; j++){
              if (speaker === "immigrant"){
                chars[j].update({"wdth": 100, "wght": 250, "alpha": .5, "ital": 1, "cap": false, "size": 50});
              } else {
                chars[j].update({"wdth": 150, "wght": 250, "alpha": .5, "ital": 0, "cap": false, "size": 50});
              }
            }
          }

          if (timeElapsed > timestamp[timestamp.length - 1]["endTime"] + 0.2 ){
            clearInterval(timer);
            this.active = false
            videoFrame.style = "radial-gradient(rgba(255,255,0,0.6), rgba(255,255,0,0) 70%);"
            videoFrame.pause();
          }

        }, 1/frameRate*1000);

      // }
    }




  }
  // TODO computed properties given the id prop
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.inactive {
  width: 300px;
  font-size: 9pt;
  display:inline-block;
  vertical-align: middle;
  align-items: center;
  border: 1px lightgrey solid;
}

.active {
  width: 100%;
  height: auto;
  font-size: 9pt;
  border: 1px lightgrey solid;
  display:inline-block;
  vertical-align: middle;
  align-items: center;
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

.quote-container {
  text-rendering: optimizeSpeed;
  font-size: 35px;
  color: black;
  width: 100%;
  display: inline-flex;
  line-height: 1.5em;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  transition: all 1s;
}

.container-quote {
  /* text-align: left; */
  float: right;
  width: 55%;
}

.container-video {
  float: left;
  display: inline-flex;
  align-items: center;
}

.inactive video {
  width: 70px;
  height: 70px;
  padding: 10px;
  border-radius: 200px;
  object-fit: cover;
  filter: invert(70%);
  opacity: 0.7;
  display: flex;
  transition: all 1s;
  border: none;
}
.active video {
  width: 190px;
  height: 190px;
  padding: 20px;
  border-radius: 190px;
  object-fit: cover;
  filter: invert(95%);
  opacity: 0.8;
  display: flex;
  transition: all 1s;
  border: none;
}

.static-quote-immigrant {
  font-family: "Newsreader", serif;
  font-size: 6pt;
  line-height: normal;
  cursor: pointer;
  transition: all 1s;
}

.static-quote-firstgen {
  font-family: "Compressa VF", serif;
  font-size: 7pt;
  line-height: normal;
  vertical-align: middle;
  cursor: pointer;
  transition: all 1s;
}
video:hover {
  background: radial-gradient(rgba(255,255,0,0.6), rgba(255,255,0,0) 90%);
  cursor: pointer;
}
</style>
