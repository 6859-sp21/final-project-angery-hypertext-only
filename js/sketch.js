
let audio, slitX;
let phrases;

function loadJSON(callback) {
    //https://www.geekstrick.com/load-json-file-locally-using-pure-javascript/
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../audio/firstgen/001.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
}

// function setup() {
//     console.log("🚀 - Setup initialized - P5 is running");
//     phrases = [loadJSON("../audio/firstgen/001.json"), loadJSON("../audio/immigrant/001.json"),
//         loadJSON("../audio/firstgen/002.json"), loadJSON("../audio/immigrant/002.json")];
//     // // FULLSCREEN CANVAS
//     // let cdiv = document.getElementById("canvas")
//     // // @ts-ignore
//     // let c = createCanvas(cdiv.offsetWidth, windowHeight);
//     // c.parent("canvas")
//     // background(240);
// }

function animateText(index) {
  console.log(phrases);
  let phrase = phrases[index];
  let count = 0, text = "", wordIndex = [], wordLetterCount = -1;
  for (let i = 0; i < Object.keys(phrase["timestamp"]).length; i++){
    text += phrase["timestamp"][i]["word"] + " ";
    wordIndex.push(wordLetterCount);
    wordLetterCount += phrase["timestamp"][i]["word"].length + 1;
  }
  let h1_left = document.getElementById("phrase-left"), h1_right = document.getElementById("phrase-right");
  let timer = setInterval(function(){
    if (count < Object.keys(phrase["timestamp"]).length ) {
      let textLeft = text.substring(0, wordIndex[count]);
      if (textLeft.length > 50){
        //can't go biggger than certain length cuz of the text overflow limit
        textLeft = textLeft.substring(textLeft.length - 50);
      }
      console.log(textLeft.length);
      h1_left.innerHTML = textLeft;
      h1_right.innerHTML = text.substring(wordIndex[count] + 1, text.length);
      count++;
    } else {
      clearInterval(timer);
    }
  }, (phrase["timestamp"][count]["endTime"] - phrase["timestamp"][count]["startTime"])*1000);
}

function main() {
 loadJSON(function(response) {
    phrases = [JSON.parse(response)];
    animateText(0);
 });
}

main();
