"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phrase_typedef_1 = require("./types/phrase_typedef");
var colMargin = 40;
var allNuclei = [];
var allThemes = [];
var allQuotes = [];
var View;
(function (View) {
    View[View["Default"] = 0] = "Default";
    View[View["Family"] = 1] = "Family";
})(View || (View = {}));
var currentView = View.Default;
var currentQuotes = [];
var selectedQuote;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    var n_myKids = new phrase_typedef_1.Nucleus("my kids");
    var n_myParents = new phrase_typedef_1.Nucleus("my parents");
    allNuclei = [n_myKids, n_myParents];
    var t_family = new phrase_typedef_1.Theme("family", [n_myKids, n_myParents]);
    allThemes = [t_family];
    var q1 = new phrase_typedef_1.Quote(phrase_typedef_1.Speaker.FirstGen, "my parents grew up in cultural revolution China so there was telling me that they " +
        "didn't have the opportunity to go to school and that's why they came here so that my brother " +
        "and I could and have the opportunity that they did not have", new phrase_typedef_1.Recording(), new phrase_typedef_1.Prosody(), [n_myParents]);
    var q2 = new phrase_typedef_1.Quote(phrase_typedef_1.Speaker.Immigrant, "With my kids, it's been so difficult to teach them Spanish, and they went to Dual Immersion school, " +
        "and you know when they were little I was like \"you cannot learn Spanish because I want you to be bilingual.\"", new phrase_typedef_1.Recording(), new phrase_typedef_1.Prosody(), [n_myKids]);
    allQuotes = [q1, q2];
    currentQuotes = allQuotes;
    var c = createCanvas(windowWidth, windowHeight);
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
    var rowSpacing = 20;
    var colWidth = width / 2 - colMargin;
    var y0 = 0;
    for (var i = 0; i < quotes.length; i++) {
        var q = quotes[i];
        text(q.fullText, 0, y0 + i * rowSpacing, colWidth);
    }
}
function drawProsody(x, y) {
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../ts/ts/sketch.js.map