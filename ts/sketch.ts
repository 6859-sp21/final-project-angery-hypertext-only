
let font, font_serif, font_sanserif, audio, xNow = 0, startTimeGlobal, slitX, animateToggle = false;
let prosody = [];
let textPoints = [], vArray = [], wordWidths = [];

let phrases;

function preload(){
  font_serif = loadFont('../fonts/DMSerifDisplay-Regular.ttf');
  font_sanserif = loadFont('../fonts/DMSans-Bold.ttf');
  audio = loadSound('../audio/firstgen/001.mp3');
  phrases = [loadJSON("../audio/firstgen/001.json"), loadJSON("../audio/immigrant/001.json"), loadJSON("../audio/firstgen/002.json"), loadJSON("../audio/immigrant/002.json")];
}


function prepareText(phrase, index, startX, startY) {
  if (index % 2 === 0){
    font = font_sanserif;
  } else {
    font = font_serif;
  }

  let fontSize = 100 - 10 * index;
  let spaceWidth = fontSize/4, textWidth = 0, wordWidth;
  let textPoints_this = [], vArray_this = [], wordWidths_this = [];

  for (var i = 0; i < Object.keys(phrase["timestamp"]).length; i++) {
    if (index === 0){
      prosody.push(randomGaussian(1.1, 0.3));
    }

    let word = phrase["timestamp"][i]["word"];
    let letters = word.split("");
    wordWidth = 0;
    let wordPoints = [];

    letters.forEach(letter => {
      wordPoints.push(font.textToPoints(letter, startX + textWidth, startY, fontSize, {sampleFactor: 0.5}));
      textWidth += font.textBounds(letter, 0, 0, fontSize).w + 2;
      wordWidth += font.textBounds(letter, 0, 0, fontSize).w + 2;
    })

    textWidth += spaceWidth;
    textPoints_this.push(wordPoints)
    let endTime = phrase["timestamp"][i]["endTime"], startTime = phrase["timestamp"][i]["startTime"];
    let intervalTime = endTime - startTime;
    vArray_this.push( (wordWidth + spaceWidth) / intervalTime );
    wordWidths_this.push( wordWidth + spaceWidth );
  }

  textPoints.push(textPoints_this);
  vArray.push(vArray_this);
  wordWidths.push(wordWidths_this);

}


function animateText(phrase, index) {
  if (index === 0){
    fill("red");
  } else {
    fill(0, 180 - index * 40);
  }

  timeElapsed = (millis() - startTimeGlobal)/1000;
  let wordIndexNow = 0, v = 0;

  for (var i = 0; i < Object.keys(phrase["timestamp"]).length; i++) {
    if (timeElapsed < phrase["timestamp"][i]["endTime"] && timeElapsed > phrase["timestamp"][i]["startTime"]) {
      wordIndexNow = i;
    }
  }

  v = vArray[index][wordIndexNow];

  xNow = 0;
  wordWidths[index].slice(0, wordIndexNow).forEach(w => { xNow += w; });
  xNow += v * (timeElapsed - phrase["timestamp"][wordIndexNow]["startTime"]);
  console.log(wordIndexNow, xNow);

  textPoints[index].forEach((wordPoints, i) => {
    wordPoints.forEach((points, j) => {
      if (index === 0) {
        fill(255, 0 , 0, 255 - 100 * prosody[i]);
      }
      beginShape();
      points.forEach(point => {
        if (index === 0){
          x = point.x - xNow;
          y = (point.y - 300) * prosody[i] * (0.8 + sin(PI/2 + (-1)**j * j/10)) + 300;
        } else {
          x = point.x;
          y = point.y;
        }
        vertex(x, y);
      })
      endShape(CLOSE);
    });

  })
}


function setup() {

  getAudioContext().suspend();
  audio.play();

  createCanvas(windowWidth, windowHeight);

  slitX = width * 0.5;

  noStroke();

  textAlign(LEFT, CENTER);

  phrases.forEach((phrase, i) => {
    prepareText(phrase, i, slitX, 300 + i * 110);
  });

}


function draw() {
  let backgroundFill = 240;
  background(backgroundFill);
  noStroke();

  phrases.forEach((phrase, i) => {
    animateText(phrase, i);
  });



  // if (audio.duration() < timeElapsed){
  //   noLoop();
  // }

  stroke("grey");
  strokeWeight(.5);
  line(slitX, 0, slitX, height);

}

function mousePressed() {
  if (animateToggle === true) {
    animateToggle = false;
  } else {
    animateToggle = true;
  }
  userStartAudio();
  startTimeGlobal = millis();
}
