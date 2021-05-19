const frameRate = 60;
let phrases;
let startTime;

function startTimer(delay) {
  startTime = new Date();
};

function loadJSON(callback) {
    //https://www.geekstrick.com/load-json-file-locally-using-pure-javascript/
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../json/data.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

var Char = function(container, char) {
  var span = document.createElement("span");
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

let chars = [];

function animateMedia(id) {

  let phrase = phrases.filter(phrase => phrase["id"] === id)[0];
  console.log(phrase);
  let count = 0, text = "", wordIndex = [], wordLetterCount = 0;
  let quoteContainer = document.getElementById("container-quote");

    if (phrase["speaker"] === "immigrant"){
    quoteContainer.style.fontFamily = "Newsreader";
  } else {
    quoteContainer.style.fontFamily = "Compressa VF";
  }
  for (let i = 0; i < phrase["timestamp"].length; i++){
    _char = new Char(quoteContainer, phrase["timestamp"][i]["word"] + " ");
    chars.push(_char);
  }

  //play video
  videoContainer = document.getElementById("container-video")
  videoContainer.innerHTML = "<video width = '250' height='500'><source src = '../media/video/" + String(id) + ".mp4#t=0' type='video/mp4'></video>"
  videoFrame = document.getElementsByTagName("video")[0];

  videoFrame.onclick = function() {
    startTimer();
    videoFrame.play();
    let wordIndexNow, wordIndexPrev;

    let timer = setInterval(function(){
      wordIndexPrev = wordIndexNow;
      let timeNow = new Date();
      let timeElapsed = (timeNow - startTime)/1000;

      //video blinking anim when playing
      videoFrame.style = "background: radial-gradient(rgba(255,255,0,"
       + String(0.4 + Math.sin(timeElapsed*10)/5) + "), rgba(255,255,0,0) 70%);"

      for (let i = 0; i < phrase["timestamp"].length; i++){
        if (timeElapsed > phrase["timestamp"][i]["startTime"]){ wordIndexNow = i; }
      }

      if (wordIndexPrev !== wordIndexNow) {
        console.log(String(wordIndexNow) + "th word:" + phrase["timestamp"][wordIndexNow]["word"]);
        let width = Math.round(10 * (phrase["timestamp"][wordIndexNow]["endTime"] - phrase["timestamp"][wordIndexNow]["startTime"]) / phrase["timestamp"][wordIndexNow]["word"].length) * 100 + 100;
        let ital = Math.round(10 * (phrase["timestamp"][wordIndexNow]["endTime"] - phrase["timestamp"][wordIndexNow]["startTime"]) / phrase["timestamp"][wordIndexNow]["word"].length);
        let weight = phrase["timestamp"][wordIndexNow]["weight"] * 200 + 150;
        let cap = (phrase["timestamp"][wordIndexNow]["weight"] > 3)? true : false;
        chars[wordIndexNow].update({"wdth": width, "wght": weight, "alpha": 1, "ital": ital, "cap": cap, "size": weight/2});

        resetIndex = (wordIndexNow < phrase["timestamp"].length - 2)? ((wordIndexNow > 2)? wordIndexNow - 2: 0): wordIndexNow + 1;

        for (let j = 0; j < resetIndex; j++){
          if (phrase["speaker"] === "immigrant"){
            chars[j].update({"wdth": 100, "wght": 250, "alpha": .5, "ital": 1, "cap": false, "size": 50});
          } else {
            chars[j].update({"wdth": 150, "wght": 250, "alpha": .5, "ital": 0, "cap": false, "size": 50});
          }
        }
      }

      if (timeElapsed > phrase["timestamp"][phrase["timestamp"].length - 1]["endTime"] + 0.2 ){
        clearInterval(timer);
        videoFrame.style = "radial-gradient(rgba(255,255,0,0.6), rgba(255,255,0,0) 70%);"
        videoFrame.pause();
      }

    }, 1/frameRate*1000);
  }
}

function main() {
 loadJSON(function(response) {
    phrases = JSON.parse(response);
    animateMedia(3);
 });
}

main();
