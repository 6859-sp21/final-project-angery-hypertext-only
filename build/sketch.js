"use strict";
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
var Speaker;
(function (Speaker) {
    Speaker["Immigrant"] = "Immigrant";
    Speaker["FirstGen"] = "FirstGen";
})(Speaker || (Speaker = {}));
// A Nucleus represents a key topic that speakers mention in their
//  Quotes. The name could be "my kids," "inclusion," etc.
// Nucleus.theme is assigned when it is added to a Theme object
class Nucleus {
    constructor(text) {
        this.quotes = [];
        this.name = text;
    }
    addQuote(q) {
        this.quotes.push(q);
    }
    addQuotes(qs) {
        this.quotes = this.quotes.concat(qs);
    }
}
// A Theme represents a collection of related Nucleus objects.
//   When a Theme is active in the visualization, its child
//   nuclei are displayed.
class Theme {
    constructor(name, nuclei) {
        this.name = "";
        this.nuclei = [];
        this.name = name;
        if (nuclei !== undefined) {
            this.nuclei = nuclei;
            nuclei.forEach((n) => {
                n.theme = this;
            });
        }
    }
    addNucleus(n) {
        this.nuclei.push(n);
        n.theme = this;
    }
    addNuclei(ns) {
        this.nuclei = this.nuclei.concat(ns);
        ns.forEach((n) => {
            n.theme = this;
        });
    }
    getNuclei() { return this.nuclei; }
    getName() { return this.name; }
}
// A Quote is an utterance from the audio source. It can contain multiple
//  Nucleus topics, and it has its linked source audio clip. It also has
//  a prosody encoding, used to render variable fonts when the Quote is
//  displayed in the visualization.
class Quote {
    // public readonly keywords; // todo need a way to represent what keywords to highlight
    constructor(speaker, fullText, audio, prosody, nuclei) {
        this.nuclei = [];
        this.speaker = speaker;
        this.fullText = fullText;
        this.audio = audio;
        this.prosody = prosody;
        if (nuclei !== undefined) {
            this.nuclei = nuclei;
            nuclei.forEach((n) => {
                n.addQuote(this);
            });
        }
    }
}
class Recording {
}
// prosody
class Prosody {
}
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
///////////////                                       ////////////////////////
///////////////            sketch.ts  T_T             ////////////////////////
///////////////                                       ////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const colMargin = 60;
let allNuclei = [];
let allThemes = [];
let allQuotes = [];
var View;
(function (View) {
    View[View["Default"] = 0] = "Default";
    View[View["Family"] = 1] = "Family";
})(View || (View = {}));
let currentView = View.Default;
let currentTheme;
let selectedQuote;
let newQuoteFlag = false;
let colDiv = document.getElementById("quotes");
const triggerProsody = function (q) {
    selectedQuote = q;
    newQuoteFlag = true;
};
function makeToggleButtons(div) {
    let b1 = document.createElement("p");
    b1.className = "toggle";
    b1.innerText = "family";
    b1.onclick = function () { currentTheme = ; };
}
function makeQuotesColumn(div) {
    for (let n of currentTheme.nuclei) {
        let title = document.createElement("p");
        title.className = "nucleus";
        title.innerText = n.name;
        div.appendChild(title);
        for (let q of n.quotes) {
            let box = document.createElement("p");
            box.innerText = q.fullText;
            box.className = "quote";
            box.onclick = () => triggerProsody(q);
            div.appendChild(box);
        }
    }
}
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    // building all quote content
    // ok obviously we will generate this from json eventually
    let n_immigrants = new Nucleus("immigrant parents");
    let n_firstgens = new Nucleus("first-generation American-born");
    let n_myKids = new Nucleus("my kids");
    let n_myParents = new Nucleus("my parents");
    allNuclei = [n_myKids, n_myParents, n_immigrants, n_firstgens];
    let t_family = new Theme("family", [n_myKids, n_myParents]);
    let t_DEFAULT = new Theme("default", [n_immigrants, n_firstgens]);
    allThemes = [t_family, t_DEFAULT];
    let q1 = new Quote(Speaker.FirstGen, "My parents grew up in Cultural Revolution China, so there was telling me that they " +
        "didn't have the opportunity to go to school, and that's why they came here, so that my brother " +
        "and I could have the opportunity that they did not have.", new Recording(), new Prosody(), [n_myParents, n_firstgens]);
    let q2 = new Quote(Speaker.Immigrant, "With my kids, it's been so difficult to teach them Spanish, and they went to Dual Immersion school, " +
        "and, you know, when they were little, I was like, \"you cannot learn Spanish because I want you to be bilingual.\"", new Recording(), new Prosody(), [n_myKids, n_immigrants]);
    allQuotes = [q1, q2];
    currentTheme = t_DEFAULT;
    // FULLSCREEN CANVAS
    let cdiv = document.getElementById("canvas");
    // @ts-ignore
    let c = createCanvas(cdiv.offsetWidth, cdiv.offsetHeight);
    c.parent("canvas");
    background(255);
    let quoteDiv = document.getElementById("quotes");
    // @ts-ignore
    makeQuotesColumn(quoteDiv);
}
// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FRAME
function draw() {
    // CLEAR BACKGROUND???
    if (newQuoteFlag) {
        background(255);
        newQuoteFlag = false;
    }
    // draw column 1
    push();
    translate(colMargin, colMargin);
    drawProsody();
    pop();
    // have a global var selectedQuote so we know which quote we're drawing
    strokeWeight(3);
}
function drawProsody() {
    // TODO
    // HELLO KII! The prosody goes here, it gets drawn
    //  in the canvas that lives in the #canvas div
    if (selectedQuote) {
        text(selectedQuote.fullText, 0, 0);
    }
}
// ///////
// // I was going to lay out the page using CSS, but it was going to be a pain
// //  to make different p5 instances per div. I'll revisit this later
//
// function drawHeaderInDiv(div:p5.Element) {
//
// }
//
// function drawTextColInDiv(div:p5.Element, align:string, quotes:Quote[]) {
//     // this goes in a div, make div the parent of the canvas?
//     // stack a bunch of divs, onclick sets the animation div to match (sets global selected var to the quote?)
//
// }
//
// function drawAnimationInDiv(div:p5.Element) {
//     // this goes in a div
// }
//
//
// function drawTextInDiv(textDiv:p5.Element, align:string, quote:Quote, w:bigint, h:bigint) {
//     // assume 0,0 is the top right of the div
//     push();
//     // DRAW
//     beginShape()
//     ;
//     endShape(CLOSE);
//     // END:DRAW
//     pop();
//
// }
// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=sketch.js.map