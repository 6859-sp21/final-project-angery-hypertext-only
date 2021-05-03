// GLOBAL VARS & TYPES
/// <reference path="./types/phrase_typedef.ts" />
/// <reference path="./types/visual_typedef.ts" />
// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED

import {Nucleus, Prosody, Quote, Recording, Speaker, Theme} from "./types/phrase_typedef";

const colMargin = 40;

let allNuclei = []
let allThemes = []
let allQuotes = []

enum View {
    Default,
    Family
}

let currentView = View.Default;
let currentQuotes: Quote[] = []
let selectedQuote:Quote

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");

    // building all quote content
    // ok obviously we will generate this from json eventually

    let n_myKids = new Nucleus("my kids")
    let n_myParents = new Nucleus("my parents")
    allNuclei = [n_myKids, n_myParents]

    let t_family = new Theme("family", [n_myKids, n_myParents])
    allThemes = [t_family]

    let q1 = new Quote(
        Speaker.FirstGen,
        "my parents grew up in cultural revolution China so there was telling me that they " +
        "didn't have the opportunity to go to school and that's why they came here so that my brother " +
        "and I could and have the opportunity that they did not have",
        new Recording(),
        new Prosody(),
        [n_myParents]
    )
    let q2 = new Quote(
        Speaker.Immigrant,
        "With my kids, it's been so difficult to teach them Spanish, and they went to Dual Immersion school, " +
        "and you know when they were little I was like \"you cannot learn Spanish because I want you to be bilingual.\"",
        new Recording(),
        new Prosody(),
        [n_myKids]
    )
    allQuotes = [q1, q2]
    currentQuotes = allQuotes

    // FULLSCREEN CANVAS
    let c = createCanvas(windowWidth, windowHeight);
    c.parent("canvas")
    background(0);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FRAME
function draw() {
    // CLEAR BACKGROUND

    // draw column 1
    push()
    translate(colMargin, colMargin)
    console.log(currentQuotes)
    drawQuoteColumn(currentQuotes)
    pop()


    // have a global var selectedQuote so we know which quote we're drawing

    strokeWeight(3);

}

function drawQuoteColumn(quotes:Quote[]) {
    const rowSpacing = 20
    const colWidth = width / 2 - colMargin
    let y0 = 0

    for (let i = 0; i < quotes.length; i++) {
        let q = quotes[i]
        text(q.fullText, 0, y0 + i*rowSpacing, colWidth)
    }
}


function drawProsody(x:bigint, y:bigint) {

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
