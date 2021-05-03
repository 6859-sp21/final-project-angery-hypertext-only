import { Nucleus, Prosody, Quote, Recording, Speaker, Theme } from "./types/phrase_typedef.js";
const colMargin = 40;
let allNuclei = [];
let allThemes = [];
let allQuotes = [];
var View;
(function (View) {
    View[View["Default"] = 0] = "Default";
    View[View["Family"] = 1] = "Family";
})(View || (View = {}));
let currentView = View.Default;
let currentQuotes = [];
let selectedQuote;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    let n_myKids = new Nucleus("my kids");
    let n_myParents = new Nucleus("my parents");
    allNuclei = [n_myKids, n_myParents];
    let t_family = new Theme("family", [n_myKids, n_myParents]);
    allThemes = [t_family];
    let q1 = new Quote(Speaker.FirstGen, "my parents grew up in cultural revolution China so there was telling me that they " +
        "didn't have the opportunity to go to school and that's why they came here so that my brother " +
        "and I could and have the opportunity that they did not have", new Recording(), new Prosody(), [n_myParents]);
    let q2 = new Quote(Speaker.Immigrant, "With my kids, it's been so difficult to teach them Spanish, and they went to Dual Immersion school, " +
        "and you know when they were little I was like \"you cannot learn Spanish because I want you to be bilingual.\"", new Recording(), new Prosody(), [n_myKids]);
    allQuotes = [q1, q2];
    currentQuotes = allQuotes;
    let c = createCanvas(windowWidth, windowHeight);
    c.parent("canvas");
    background(0);
}
function draw() {
    push();
    translate(colMargin, colMargin);
    console.log(currentQuotes);
    drawQuoteColumn(currentQuotes);
    pop();
    strokeWeight(3);
}
function drawQuoteColumn(quotes) {
    const rowSpacing = 20;
    const colWidth = width / 2 - colMargin;
    let y0 = 0;
    for (let i = 0; i < quotes.length; i++) {
        let q = quotes[i];
        text(q.fullText, 0, y0 + i * rowSpacing, colWidth);
    }
}
function drawProsody(x, y) {
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
