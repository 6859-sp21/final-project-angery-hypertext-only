// GLOBAL VARS & TYPES
// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
///////////////////
//////////////////  ugh I'm so sorry, I couldn't get things to link so it's all in one file rn
//////////////////

// import {Nucleus, Prosody, Quote, Recording, Speaker, Theme} from "./types/phrase_typedef.js";

//
//  Sample usage:
//  Nucleus n1 = new Nucleus("inclusion")
//  Nucleus n2 = new Nucleus("exclusion")
//  Theme t = new Theme("belonging", [n1, n2])
//  Theme t2 = new Theme("foo"); t2.addNucleus(n1); t2.addNuclei([n1, n2])
//  Quote q = new Quote([n1], Speaker.Immigrant, $full_text, $audio, $prosody)
//  Quote q2 = new Quote(...)
//  n1.addQuote(q)
//  n1.addQuotes([q, q2])
//

 enum Speaker {
    Immigrant = "Immigrant",
    FirstGen = "FirstGen"
}

// A Nucleus represents a key topic that speakers mention in their
//  Quotes. The name could be "my kids," "inclusion," etc.
// Nucleus.theme is assigned when it is added to a Theme object
 class Nucleus {
    public readonly name: string;
    public theme: Theme | undefined;
    public quotes: Quote[] = [];
    constructor(text: string) {
        this.name = text;
    }

    public addQuote(q:Quote) {
        this.quotes.push(q)
    }

    public addQuotes(qs:Quote[]) {
        this.quotes = this.quotes.concat(qs)
    }

}

// A Theme represents a collection of related Nucleus objects.
//   When a Theme is active in the visualization, its child
//   nuclei are displayed.
 class Theme {
    public readonly name: string = "";
    public nuclei: Nucleus[] = [];

    constructor(name: string, nuclei?: Nucleus[]) {
        this.name = name;
        if (nuclei !== undefined) {
            this.nuclei = nuclei;
            nuclei.forEach((n: Nucleus) => {
                n.theme = this;
            })
        }
    }

    public addNucleus(n:Nucleus) {
        this.nuclei.push(n);
        n.theme = this;
    }

    public addNuclei(ns:Nucleus[]) {
        this.nuclei = this.nuclei.concat(ns)
        ns.forEach((n:Nucleus) => {
            n.theme = this;
        })
    }

    public getNuclei() { return this.nuclei; }

    public getName() { return this.name; }
}


// A Quote is an utterance from the audio source. It can contain multiple
//  Nucleus topics, and it has its linked source audio clip. It also has
//  a prosody encoding, used to render variable fonts when the Quote is
//  displayed in the visualization.
 class Quote {
    public readonly nuclei:Nucleus[] = [];
    public readonly speaker: Speaker;
    public readonly fullText: string;
    public readonly audio: Recording; // todo this is to encapsulate playing the right audio on click
    public readonly prosody: Prosody;
    // public readonly keywords; // todo need a way to represent what keywords to highlight

    constructor(speaker: Speaker, fullText: string, audio: Recording, prosody: Prosody, nuclei?: Nucleus[]) {
        this.speaker = speaker;
        this.fullText = fullText;
        this.audio = audio;
        this.prosody = prosody;
        if (nuclei !== undefined) {
            this.nuclei = nuclei;
            nuclei.forEach((n:Nucleus) => {
                n.addQuote(this)
            })
        }
    }
}

 class Recording {
    // todo encapsulate how to play audio
}

// prosody
 class Prosody {
    // encoding goes here
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////                                       ////////////////////////
///////////////            sketch.ts  T_T             ////////////////////////
///////////////                                       ////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const colMargin = 60;

let allNuclei = []
let allThemes = []
let allQuotes: Quote[] = []

let currentTheme:Theme;
let selectedQuote:Quote
let newQuoteFlag = false; // Are we changing the selected quote on the next frame?

// @ts-ignore
let quoteDiv:HTMLElement = document.getElementById("quotes")
// @ts-ignore
let headerDiv:HTMLElement = document.getElementById("header")


/////////////// building all quote content //////////////////////////////////////
// ok obviously we will generate this from json eventually

let n_immigrants = new Nucleus("immigrant parents")
let n_firstgens = new Nucleus("first-generation American-born")
let n_myKids = new Nucleus("my kids")
let n_myParents = new Nucleus("my parents")
allNuclei = [n_myKids, n_myParents, n_immigrants, n_firstgens]

let t_family = new Theme("family", [n_myKids, n_myParents])
let t_DEFAULT = new Theme("default", [n_immigrants, n_firstgens])
allThemes = [t_family, t_DEFAULT]

let q1 = new Quote(
    Speaker.FirstGen,
    "My parents grew up in Cultural Revolution China, so there was telling me that they " +
    "didn't have the opportunity to go to school, and that's why they came here, so that my brother " +
    "and I could have the opportunity that they did not have.",
    new Recording(),
    new Prosody(),
    [n_myParents, n_firstgens]
)
let q2 = new Quote(
    Speaker.Immigrant,
    "With my kids, it's been so difficult to teach them Spanish, and they went to Dual Immersion school, " +
    "and, you know, when they were little, I was like, \"you cannot learn Spanish because I want you to be bilingual.\"",
    new Recording(),
    new Prosody(),
    [n_myKids, n_immigrants]
)
let q3 = new Quote(
    Speaker.Immigrant,
    "This is another immigrant parent quote.",
    new Recording(),
    new Prosody(),
    [n_myParents, n_immigrants]
)
let q4 = new Quote(
    Speaker.FirstGen,
    "This is another first-generation American-born quote.",
    new Recording(),
    new Prosody(),
    [n_myKids, n_firstgens]
)
allQuotes = [q1, q2, q3, q4]


const triggerProsody = function(q:Quote) {
    selectedQuote = q
    newQuoteFlag = true
    audio.play() // TODO this will be the quote audio

    animateToggle = !animateToggle
    userStartAudio();
    startTimeGlobal = millis();
}

function makeToggleButtons(){
    let b1 = document.createElement("button")
    b1.className = "toggle"
    b1.innerText = "family"
    b1.onclick = function() {
        currentTheme = t_family;
        // @ts-ignore
        let quoteDiv:HTMLElement = document.getElementById("quotes");
        makeQuotesColumn(quoteDiv) }

    let headerDiv = document.getElementById("header")
    if(headerDiv) {    headerDiv.appendChild(b1)}
    else {console.log("hey where is the header div")}

    let b2 = document.createElement("button")
    b2.className = "toggle"
    b2.innerText = "default"
    b2.onclick = function() {
        currentTheme = t_DEFAULT;
        // @ts-ignore
        let quoteDiv:HTMLElement = document.getElementById("quotes");
        makeQuotesColumn(quoteDiv) }

    headerDiv = document.getElementById("header")
    if(headerDiv) {    headerDiv.appendChild(b2)}

}

function makeQuotesColumn(div:HTMLElement) {
    // TODO this will instead need to instantiate the quote divs with font
    //   by speaker, then animate them on a toggle.
    while (div.firstChild) {
        div.firstChild.remove()
    }

    for(let n of currentTheme.nuclei) {
        let title = document.createElement("p")
        title.className = "nucleus"
        title.innerText = n.name
        div.appendChild(title)


        for(let q of n.quotes) {
            let box = document.createElement("p")
            box.innerText = q.fullText;
            box.className = "quote "
            if (q.speaker === Speaker.Immigrant) {
                box.className += "immigrant "
            } else {
                box.className += "firstGen "
            }
            box.onclick = () => triggerProsody(q)
            div.appendChild(box)

        }
    }

}

//////////// p5.js for drawing the prosody ////////////////
//////////////////////////////////////////////////////////

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    currentTheme = t_DEFAULT

    // FULLSCREEN CANVAS
    let cdiv = document.getElementById("canvas")
    // @ts-ignore
    let c = createCanvas(cdiv.offsetWidth, windowHeight);
    c.parent("canvas")
    background(240);


    let quoteDiv = document.getElementById("quotes")
    // @ts-ignore
    makeQuotesColumn(quoteDiv)
    makeToggleButtons()



    /// set up for prosody animation
    getAudioContext().suspend();
    audio.play()
    slitX = width * 0.5;

    noStroke();

    textAlign(LEFT, CENTER);

    phrases.forEach((phrase, i) => {
        prepareText(phrase, i, slitX, 300 + i * 110);
    });
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FRAME
function draw() {
    // CLEAR BACKGROUND???
    if (newQuoteFlag) {
        background(240)
        newQuoteFlag = false
    }

    // draw column 1
    push()
    translate(colMargin, colMargin)
    if (animateToggle) {drawProsody()}
    pop()

    // have a global var selectedQuote so we know which quote we're drawing

    strokeWeight(3);

}

function drawProsody() {

    // if (selectedQuote) {
    //     text(selectedQuote.fullText, 0, 0)
    // }

    // this came from the draw() fn of sketch_anim.ts

    if (!selectedQuote) {return}

    let backgroundFill = 240;
    background(backgroundFill);
    noStroke();

    console.log("phrases:")
    console.log(phrases)

    phrases.forEach((phrase, i) => {
        animateText(phrase, i);
    });




    stroke("grey");
    strokeWeight(.5);
    line(slitX, 0, slitX, height);

}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}



//////// this is JS /////////
let font, font_serif, font_sanserif, audio, xNow = 0, startTimeGlobal, slitX, animateToggle = false;
let prosody = [];
let textPoints = [], vArray = [], wordWidths = [];

let phrases;

function preload(){
    font_serif = loadFont('../fonts/DMSerifDisplay-Regular.ttf');
    font_sanserif = loadFont('../fonts/DMSans-Bold.ttf');
    audio = loadSound('../audio/firstgen/001.mp3');
    phrases = [loadJSON("../audio/firstgen/001.json"), loadJSON("../audio/immigrant/001.json"),
        loadJSON("../audio/firstgen/002.json"), loadJSON("../audio/immigrant/002.json")];
}


function prepareText(phrase, index, startX, startY) {
    console.log("prepareText: " + phrase + " " + index + " " + startX + " " + startY)
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

    const timeElapsed = (millis() - startTimeGlobal) / 1000;

    if (timeElapsed > audio.duration()) {
        animateToggle = false
        return
    }

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

    if (wordIndexNow >= vArray[index][-1]) {
        console.log("I think this is the last word?")
        animateToggle = false
        return;
    }

    textPoints[index].forEach((wordPoints, i) => {
        wordPoints.forEach((points, j) => {
            if (index === 0) {
                fill(255, 0 , 0, 255 - 100 * prosody[i]);
            }
            beginShape();
            points.forEach(point => {
                let x, y
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

function mousePressed() {

}