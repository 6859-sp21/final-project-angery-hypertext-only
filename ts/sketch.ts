let font;
let audio;
let startTimeGlobal;
let textPoints = [];
let vArray = [];
let wordWidths = [];
let fontSize = 80;
let xNow;

const frRate = 60;

let phrase_001;

function preload(){
  font = loadFont('../fonts/DMSerifDisplay-Regular.ttf');
  audio = loadSound('../audio/firstgen/001.mp3');
  phrase_001 = loadJSON("../audio/firstgen/001.json")
}


function prepareText(phrase, startX, startY) {
  let spaceWidth = fontSize/5, textWidth = 0, wordWidth;
  for (var i = 0; i < Object.keys(phrase).length - 1; i++) {
    let word = phrase[i]["word"];
    let letters = word.split("");
    wordWidth = 0;
    letters.forEach(letter => {
      textPoints.push(font.textToPoints(letter, startX + textWidth, startY, fontSize, {sampleFactor: 0.3}));
      textWidth += font.textBounds(letter, 0, 0, fontSize).w;
      wordWidth += font.textBounds(letter, 0, 0, fontSize).w;
    })
    textWidth += spaceWidth;

    let endTime = phrase[i]["endTime"], startTime = phrase[i]["startTime"];
    let intervalTime = endTime - startTime;
    vArray.push( (wordWidth + spaceWidth) / intervalTime );
    wordWidths.push( wordWidth + spaceWidth );
  }
}


function animateText(phrase) {
  timeElapsed = (millis() - startTimeGlobal)/1000;
  // if (timeElapsed < startTime) { return; };
  let indexNow = 0, v = 0;

  for (var i = 0; i < Object.keys(phrase).length - 1; i++) {
    if (timeElapsed < phrase[i]["endTime"] && timeElapsed > phrase[i]["startTime"]) {
      indexNow = i;
    }
  }

  v = vArray[indexNow];

  xNow = 0;
  wordWidths.slice(0, indexNow).forEach(w => { xNow += w; });
  xNow += v * (timeElapsed - phrase[indexNow]["startTime"]);
  console.log(indexNow, xNow);

  translate(-xNow, 0);

  textPoints.forEach(points => {
    beginShape();
    points.forEach(point => {
      vertex(point.x, point.y);
    })
    endShape(CLOSE);
  })
}


function setup() {
  audio.play();
  createCanvas(windowWidth, windowHeight);
  frameRate(frRate);


  noStroke();
  fill("red");
  textFont(font);
  textAlign(LEFT, CENTER);
  prepareText(phrase_001, width * 3 / 5, 300);

  startTimeGlobal = millis();

}


function draw() {
  let slitX = width * 3 / 5;
  let backgroundFill = 240;
  background(backgroundFill);
  noStroke();

  animateText(phrase_001);

  if (audio.duration() < timeElapsed){
    noLoop();
  }

  stroke("grey");
  strokeWeight(1);
  line(slitX + xNow, 0, slitX + xNow, height);

}
