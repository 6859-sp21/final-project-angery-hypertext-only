"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prosody = exports.Recording = exports.Quote = exports.Theme = exports.Nucleus = exports.Speaker = void 0;
var Speaker;
(function (Speaker) {
    Speaker["Immigrant"] = "Immigrant";
    Speaker["FirstGen"] = "FirstGen";
})(Speaker = exports.Speaker || (exports.Speaker = {}));
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
        q.nuclei.push(this);
    }
    addQuotes(qs) {
        this.quotes = this.quotes.concat(qs);
        qs.forEach((q) => {
            q.nuclei.push(this);
        });
    }
    getQuotes() { return this.quotes; }
}
exports.Nucleus = Nucleus;
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
exports.Theme = Theme;
// A Quote is an utterance from the audio source. It can contain multiple
//  Nucleus topics, and it has its linked source audio clip. It also has
//  a prosody encoding, used to render variable fonts when the Quote is
//  displayed in the visualization.
class Quote {
    // public readonly keywords; // todo need a way to represent what keywords to highlight
    constructor(id, speaker, fullText, audio, prosody, nuclei) {
        this.nuclei = [];
        this.id = id;
        this.speaker = speaker;
        this.fullText = fullText;
        this.audio = audio;
        this.prosody = prosody;
        if (nuclei !== undefined) {
            this.nuclei = nuclei;
        }
    }
}
exports.Quote = Quote;
class Recording {
}
exports.Recording = Recording;
// prosody
class Prosody {
}
exports.Prosody = Prosody;
//# sourceMappingURL=phrase_typedef.js.map