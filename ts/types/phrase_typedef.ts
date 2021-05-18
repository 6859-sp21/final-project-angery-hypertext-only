
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

    export enum Speaker {
        Immigrant = "Immigrant",
        FirstGen = "FirstGen"
    }

    // A Nucleus represents a key topic that speakers mention in their
    //  Quotes. The name could be "my kids," "inclusion," etc.
    // Nucleus.theme is assigned when it is added to a Theme object
    export class Nucleus {
        public readonly name: string;
        public theme: Theme | undefined;
        private quotes: Quote[] = [];
        constructor(text: string) {
            this.name = text;
        }

        public addQuote(q:Quote) {
            this.quotes.push(q)
            q.nuclei.push(this)
        }

        public addQuotes(qs:Quote[]) {
            this.quotes = this.quotes.concat(qs)
            qs.forEach((q:Quote) => {
                q.nuclei.push(this)
            })
        }

        public getQuotes() { return this.quotes; }
    }

    // A Theme represents a collection of related Nucleus objects.
    //   When a Theme is active in the visualization, its child
    //   nuclei are displayed.
    export class Theme {
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
    export class Quote {
        public nuclei:Nucleus[] = [];
        public readonly id: number = 0;
        public readonly speaker: Speaker;
        public readonly fullText: string;
        public readonly audio: Recording; // todo this is to encapsulate playing the right audio on click
        public readonly prosody: Prosody;
        // public readonly keywords; // todo need a way to represent what keywords to highlight

        constructor(id: number, speaker: Speaker, fullText: string, audio: Recording, prosody: Prosody, nuclei?: Nucleus[]) {
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

    export class Recording {
        // todo encapsulate how to play audio
    }

// prosody
    export class Prosody {
        // encoding goes here
    }