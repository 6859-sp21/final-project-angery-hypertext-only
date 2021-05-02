var QuoteTypes;
(function (QuoteTypes) {
    var Speaker;
    (function (Speaker) {
        Speaker["Immigrant"] = "Immigrant";
        Speaker["FirstGen"] = "FirstGen";
    })(Speaker || (Speaker = {}));
    // nucleus
    var Nucleus = /** @class */ (function () {
        function Nucleus(text, theme) {
            this.name = text;
            this.theme = theme;
        }
        return Nucleus;
    }());
    QuoteTypes.Nucleus = Nucleus;
    // theme
    var Theme = /** @class */ (function () {
        function Theme(name, nuclei) {
            this.name = name;
            this.nuclei = nuclei;
        }
        return Theme;
    }());
    QuoteTypes.Theme = Theme;
    // quote
    var Quote = /** @class */ (function () {
        // public readonly keywords; // todo need a way to represent what keywords to highlight
        function Quote(nuclei, speaker, fullText, audio, prosody) {
            this.nuclei = nuclei;
            this.speaker = speaker;
            this.name = fullText;
            this.audio = audio;
            this.prosody = prosody;
        }
        return Quote;
    }());
    QuoteTypes.Quote = Quote;
    var Audio = /** @class */ (function () {
        function Audio() {
        }
        return Audio;
    }());
    QuoteTypes.Audio = Audio;
    // prosody
    var Prosody = /** @class */ (function () {
        function Prosody() {
        }
        return Prosody;
    }());
    QuoteTypes.Prosody = Prosody;
})(QuoteTypes || (QuoteTypes = {}));
