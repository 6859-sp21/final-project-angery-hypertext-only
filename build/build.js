var QuoteTypes;
(function (QuoteTypes) {
    var Speaker;
    (function (Speaker) {
        Speaker["Immigrant"] = "Immigrant";
        Speaker["FirstGen"] = "FirstGen";
    })(Speaker || (Speaker = {}));
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
    QuoteTypes.Nucleus = Nucleus;
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
    QuoteTypes.Theme = Theme;
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
    QuoteTypes.Quote = Quote;
    var Audio = (function () {
        function Audio() {
        }
        return Audio;
    }());
    QuoteTypes.Audio = Audio;
    var Prosody = (function () {
        function Prosody() {
        }
        return Prosody;
    }());
    QuoteTypes.Prosody = Prosody;
})(QuoteTypes || (QuoteTypes = {}));
var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var font, font_serif, font_sanserif, audio, xNow = 0, startTimeGlobal, slitX, animateToggle = false;
var prosody = [];
var textPoints = [], vArray = [], wordWidths = [];
var phrases;
function preload() {
    font_serif = loadFont('../fonts/DMSerifDisplay-Regular.ttf');
    font_sanserif = loadFont('../fonts/DMSans-Bold.ttf');
    audio = loadSound('../audio/firstgen/001.mp3');
    phrases = [loadJSON("../audio/firstgen/001.json"), loadJSON("../audio/immigrant/001.json"),
        loadJSON("../audio/firstgen/002.json"), loadJSON("../audio/immigrant/002.json")];
}
function prepareText(phrase, index, startX, startY) {
    if (index % 2 === 0) {
        font = font_sanserif;
    }
    else {
        font = font_serif;
    }
    var fontSize = 100 - 10 * index;
    var spaceWidth = fontSize / 4, textWidth = 0, wordWidth;
    var textPoints_this = [], vArray_this = [], wordWidths_this = [];
    var _loop_1 = function () {
        if (index === 0) {
            prosody.push(randomGaussian(1.1, 0.3));
        }
        var word = phrase["timestamp"][i]["word"];
        var letters = word.split("");
        wordWidth = 0;
        var wordPoints = [];
        letters.forEach(function (letter) {
            wordPoints.push(font.textToPoints(letter, startX + textWidth, startY, fontSize, { sampleFactor: 0.5 }));
            textWidth += font.textBounds(letter, 0, 0, fontSize).w + 2;
            wordWidth += font.textBounds(letter, 0, 0, fontSize).w + 2;
        });
        textWidth += spaceWidth;
        textPoints_this.push(wordPoints);
        var endTime = phrase["timestamp"][i]["endTime"], startTime = phrase["timestamp"][i]["startTime"];
        var intervalTime = endTime - startTime;
        vArray_this.push((wordWidth + spaceWidth) / intervalTime);
        wordWidths_this.push(wordWidth + spaceWidth);
    };
    for (var i = 0; i < Object.keys(phrase["timestamp"]).length; i++) {
        _loop_1();
    }
    textPoints.push(textPoints_this);
    vArray.push(vArray_this);
    wordWidths.push(wordWidths_this);
}
function animateText(phrase, index) {
    if (index === 0) {
        fill("red");
    }
    else {
        fill(0, 180 - index * 40);
    }
    timeElapsed = (millis() - startTimeGlobal) / 1000;
    var wordIndexNow = 0, v = 0;
    for (var i = 0; i < Object.keys(phrase["timestamp"]).length; i++) {
        if (timeElapsed < phrase["timestamp"][i]["endTime"] && timeElapsed > phrase["timestamp"][i]["startTime"]) {
            wordIndexNow = i;
        }
    }
    v = vArray[index][wordIndexNow];
    xNow = 0;
    wordWidths[index].slice(0, wordIndexNow).forEach(function (w) { xNow += w; });
    xNow += v * (timeElapsed - phrase["timestamp"][wordIndexNow]["startTime"]);
    console.log(wordIndexNow, xNow);
    textPoints[index].forEach(function (wordPoints, i) {
        wordPoints.forEach(function (points, j) {
            if (index === 0) {
                fill(255, 0, 0, 255 - 100 * prosody[i]);
            }
            beginShape();
            points.forEach(function (point) {
                if (index === 0) {
                    x = point.x - xNow;
                    y = (point.y - 300) * prosody[i] * (0.8 + sin(PI / 2 + Math.pow((-1), j) * j / 10)) + 300;
                }
                else {
                    x = point.x;
                    y = point.y;
                }
                vertex(x, y);
            });
            endShape(CLOSE);
        });
    });
}
function setup() {
    getAudioContext().suspend();
    audio.play();
    createCanvas(windowWidth, windowHeight);
    slitX = width * 0.5;
    noStroke();
    textAlign(LEFT, CENTER);
    phrases.forEach(function (phrase, i) {
        prepareText(phrase, i, slitX, 300 + i * 110);
    });
}
function draw() {
    var backgroundFill = 240;
    background(backgroundFill);
    noStroke();
    phrases.forEach(function (phrase, i) {
        animateText(phrase, i);
    });
    stroke("grey");
    strokeWeight(.5);
    line(slitX, 0, slitX, height);
}
function mousePressed() {
    if (animateToggle === true) {
        animateToggle = false;
    }
    else {
        animateToggle = true;
    }
    userStartAudio();
    startTimeGlobal = millis();
}
//# sourceMappingURL=../ts.old/ts.old/build.js.map