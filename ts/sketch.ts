let font;
let audio;
let startTimeGlobal;
let textPoints = [];
let vArray = [];
let wordWidths = [];
let fontSize = 80;
let xNow;

const frRate = 60;

const phrase_001 = {"full_text": "my parents grew up in cultural revolution China so there was telling me that they didn't have the opportunity to go to school and that's why they came here so that my brother and I could and have the opportunity that they did not have", "0": {"word": "my", "startTime": 0.3, "endTime": 0.7}, "1": {"word": "parents", "startTime": 0.7, "endTime": 1.1}, "2": {"word": "grew", "startTime": 1.1, "endTime": 1.2}, "3": {"word": "up", "startTime": 1.2, "endTime": 1.3}, "4": {"word": "in", "startTime": 1.3, "endTime": 1.5}, "5": {"word": "cultural", "startTime": 1.5, "endTime": 2.0}, "6": {"word": "revolution", "startTime": 2.0, "endTime": 2.4}, "7": {"word": "China", "startTime": 2.4, "endTime": 2.5}, "8": {"word": "so", "startTime": 2.5, "endTime": 3.1}, "9": {"word": "they're", "startTime": 3.1, "endTime": 3.9}, "10": {"word": "always", "startTime": 3.9, "endTime": 4.1}, "11": {"word": "telling", "startTime": 4.1, "endTime": 4.2}, "12": {"word": "me", "startTime": 4.2, "endTime": 4.3}, "13": {"word": "that", "startTime": 4.3, "endTime": 4.5}, "14": {"word": "they", "startTime": 4.5, "endTime": 5.1}, "15": {"word": "didn't", "startTime": 5.1, "endTime": 5.3}, "16": {"word": "have", "startTime": 5.3, "endTime": 5.4}, "17": {"word": "the", "startTime": 5.4, "endTime": 5.5}, "18": {"word": "opportunity", "startTime": 5.5, "endTime": 5.9}, "19": {"word": "to", "startTime": 5.9, "endTime": 6.0}, "20": {"word": "go", "startTime": 6.0, "endTime": 6.05}, "21": {"word": "to", "startTime": 6.05, "endTime": 6.1}, "22": {"word": "school", "startTime": 6.1, "endTime": 6.5}, "23": {"word": "and", "startTime": 6.5, "endTime": 6.6}, "24": {"word": "that's", "startTime": 6.6, "endTime": 6.7}, "25": {"word": "why", "startTime": 6.7, "endTime": 6.9}, "26": {"word": "they", "startTime": 6.9, "endTime": 7.0}, "27": {"word": "came", "startTime": 7.0, "endTime": 7.2}, "28": {"word": "here", "startTime": 7.2, "endTime": 7.3}, "29": {"word": "so", "startTime": 7.3, "endTime": 7.7}, "30": {"word": "that", "startTime": 7.7, "endTime": 7.8}, "31": {"word": "my", "startTime": 7.8, "endTime": 8.0}, "32": {"word": "brother", "startTime": 8.0, "endTime": 8.1}, "33": {"word": "and", "startTime": 8.1, "endTime": 8.2}, "34": {"word": "I", "startTime": 8.2, "endTime": 8.4}, "35": {"word": "could", "startTime": 8.4, "endTime": 8.8}, "36": {"word": "and", "startTime": 8.8, "endTime": 9.5}, "37": {"word": "have", "startTime": 9.5, "endTime": 9.7}, "38": {"word": "the", "startTime": 9.7, "endTime": 9.8}, "39": {"word": "opportunity", "startTime": 9.8, "endTime": 10.4}, "40": {"word": "that", "startTime": 10.4, "endTime": 10.5}, "41": {"word": "they", "startTime": 10.5, "endTime": 10.8}, "42": {"word": "did", "startTime": 10.8, "endTime": 11.0}, "43": {"word": "not", "startTime": 11.0, "endTime": 11.1}, "44": {"word": "have", "startTime": 11.1, "endTime": 11.3}};


function preload(){
  font = loadFont('../fonts/DMSerifDisplay-Regular.ttf');
  audio = loadSound('../audio/firstgen/001.mp3');
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
