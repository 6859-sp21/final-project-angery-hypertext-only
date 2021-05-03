"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prosody = exports.Recording = exports.Quote = exports.Theme = exports.Nucleus = exports.Speaker = void 0;
var Speaker;
(function (Speaker) {
    Speaker["Immigrant"] = "Immigrant";
    Speaker["FirstGen"] = "FirstGen";
})(Speaker = exports.Speaker || (exports.Speaker = {}));
var Nucleus = (function () {
    function Nucleus(text) {
        this.quotes = [];
        this.name = text;
    }
    Nucleus.prototype.addQuote = function (q) {
        this.quotes.push(q);
        q.nuclei.push(this);
    };
    Nucleus.prototype.addQuotes = function (qs) {
        var _this = this;
        this.quotes = this.quotes.concat(qs);
        qs.forEach(function (q) {
            q.nuclei.push(_this);
        });
    };
    Nucleus.prototype.getQuotes = function () { return this.quotes; };
    return Nucleus;
}());
exports.Nucleus = Nucleus;
var Theme = (function () {
    function Theme(name, nuclei) {
        var _this = this;
        this.nuclei = [];
        this.name = name;
        if (nuclei.length > 0) {
            this.nuclei = nuclei;
            nuclei.forEach(function (n) {
                n.theme = _this;
            });
        }
    }
    Theme.prototype.addNucleus = function (n) {
        this.nuclei.push(n);
        n.theme = this;
    };
    Theme.prototype.addNuclei = function (ns) {
        var _this = this;
        this.nuclei = this.nuclei.concat(ns);
        ns.forEach(function (n) {
            n.theme = _this;
        });
    };
    Theme.prototype.getNuclei = function () { return this.nuclei; };
    Theme.prototype.getName = function () { return this.name; };
    return Theme;
}());
exports.Theme = Theme;
var Quote = (function () {
    function Quote(speaker, fullText, audio, prosody, nuclei) {
        this.nuclei = [];
        this.speaker = speaker;
        this.fullText = fullText;
        this.audio = audio;
        this.prosody = prosody;
        if (nuclei.length > 0) {
            this.nuclei = nuclei;
        }
    }
    return Quote;
}());
exports.Quote = Quote;
var Recording = (function () {
    function Recording() {
    }
    return Recording;
}());
exports.Recording = Recording;
var Prosody = (function () {
    function Prosody() {
    }
    return Prosody;
}());
exports.Prosody = Prosody;
//# sourceMappingURL=../../ts/ts/types/phrase_typedef.js.map