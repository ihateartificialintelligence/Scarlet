const Sentimood = require('../models/sentimood');

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};
var flag;
var modText = '';
var modScore = '';
/**
 *
 *
 * @param {*} input
 * @return {*} 
 */
function analyze(input) {
    if (typeof input !== 'string') throw new Error('Invalid input type. Please convert to a string!');
    let inputMod = input.toLowerCase().replace(/[^'a-zA-Z ]+/g, ' ').replace('/ {2,}/', ' ');
    let finalWords = [];
    let sentimood = Sentimood;
    let topics = sentimood.prototype.analyze_sentence(input);
    let analysis=  sentimood.prototype.analyze(inputMod);
    console.log("Score", analysis.score);
    console.log(analysis);

    finalWords = analysis.positive.words.concat(analysis.negative.words);
    console.log("Sentimental Words: ", finalWords);

    let contents = inputMod.split(" ");

    for (let i = 0; i < contents.length; i++) {
        if (analysis.negative.words.indexOf(contents[i]) === -1) {
            modText += contents[i];
            for (contents[i] in range(-5, -4)) {
                flag = 1;
                return {
                    score: analysis.score, 
                    flagged: flag,
                    words: finalWords,
                    topic: topics.topic
                };
            }
        } else if (analysis.positive.words.indexOf(contents[i]) === -1) {
            modText += contents[i];
            for (contents[i] in range(0, 5)) {
                flag = 0;
                return {
                    score: analysis.score,
                    flagged: flag,
                    words: finalWords,
                    topic: topics.topic
                };
            }
        }
    }
}

module.exports = Object.assign(analyze);
/**
 * if(analysis.score >= 4) {
        modScore = '<span class="strongpos"> Score: ' + analysis.score + String.fromCodePoint(0x1F603) + '</span> ';
    } else if(analysis.score > 0 && analysis.score < 4) {
        modScore += '<span class="pos"> Score: ' + analysis.score + String.fromCodePoint(0x1F642) + '</span> ';
    } else if(analysis.score < 0 && analysis.score > -4) {
        modScore += '<span class="neg"> Score: ' + analysis.score + String.fromCodePoint(0x1F641) + '</span> ';
    } else if(analysis.score <= -4) {
        modScore += '<span class="strongneg"> Score: ' + analysis.score + String.fromCodePoint(0x1F626) + '</span> ';
    } else {
        modScore += '<span> Score: ' + analysis.score + String.fromCodePoint(0x1F610) + '</span> ';
    }
 */