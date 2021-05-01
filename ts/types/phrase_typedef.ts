

namespace QuoteTypes {

    enum Speaker {
        Immigrant = "Immigrant",
        FirstGen = "FirstGen"
    }
// nucleus
    export class Nucleus {
        public readonly fullText: string;
        public readonly theme: Theme;
        constructor(text: string, theme: Theme) {
            this.fullText = text;
            this.theme = theme;
        }
    }

// theme
    export class Theme {
        public readonly name: string;
        public readonly nuclei: Nucleus[];

        constructor(name: string, nuclei: Nucleus[]) {
            this.name = name;
            this.nuclei = nuclei;
        }
    }


// quote
    export class Quote {
        public readonly nuclei: Nucleus[];
        public readonly speaker: Speaker;
        public readonly fullText: string;
        public readonly audio: Audio;
        public readonly prosody: Prosody;
        // public readonly keywords; // todo need a way to represent what keywords to highlight

        constructor(nuclei: Nucleus[], speaker: Speaker, fullText: string, audio: Audio, prosody: Prosody) {
            this.nuclei = nuclei;
            this.speaker = speaker;
            this.fullText = fullText;
            this.audio = audio;
            this.prosody = prosody;
        }
    }

    export class Audio {
        // todo encapsulate how to play audio
    }

// prosody
    export class Prosody {
        // encoding goes here
    }

}