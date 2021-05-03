export var Speaker;
(function (Speaker) {
    Speaker["Immigrant"] = "Immigrant";
    Speaker["FirstGen"] = "FirstGen";
})(Speaker || (Speaker = {}));
export class Nucleus {
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
export class Theme {
    constructor(name, nuclei) {
        this.nuclei = [];
        this.name = name;
        if (nuclei.length > 0) {
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
export class Quote {
    constructor(speaker, fullText, audio, prosody, nuclei) {
        this.nuclei = [];
        this.speaker = speaker;
        this.fullText = fullText;
        this.audio = audio;
        this.prosody = prosody;
        if (nuclei.length > 0) {
            this.nuclei = nuclei;
        }
    }
}
export class Recording {
}
export class Prosody {
}
