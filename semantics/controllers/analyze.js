const Sentimood = require('../models/sentimood');

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
    let flag = 0;
    let sentimood = Sentimood;
    let analysis=  sentimood.prototype.analyze(inputMod);
    console.log("Score", analysis.score);
    console.log(analysis);

    finalWords = analysis.positive.words.concat(analysis.negative.words);
    console.log("Sentimental Words: ", finalWords);

    let contents = inputMod.split(" ");
    let modText = '';
    let modScore = '';

    for (let i = 0; i < contents.length; i++) {
        if (finalWords.indexOf(contents[i]) == -1){
            if (stopWords.indexOf(contents[i]) === -1) {
                modText += contents[i];
            } else {
                modText += contents[i];
            }
        } else {
            if (analysis.negative.words.indexOf(contents[i]) === -1) {
                modText += contents[i];
                for (contents[i] in range(-5, -4)) {
                    return analysis.score;
                }
            } else if (analysis.positive.words.indexof(contents[i]) === -1) {
                modText += contents[i];
                for (contents[i] in range(0, 5)) {
                    return analysis.score;
                }
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