/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
const /** // Require these later
    nouns = require("./nouns.json"),
    verbs = require("./verbs.json"),
    proverbs = require("./proverbs.json"),
    adverbs = require("./adverbs.json"),**/
  structures = require('../../../../structs.json');


export class SentenceGenerator {
  constructor() {};

  static prevStruct(pastSentence: string): any {
    if (!pastSentence) throw new SyntaxError('No past sentence provided');
    if (typeof pastSentence !== 'string') throw new TypeError('pastSentence is not a String');
    const parsed = JSON.parse(structures);
    let base = parsed.simple.base; // This grabs the base structure of the sentence.
    let sentencebase = pastSentence;
    function findSubject_ComplexBase(sentence: string) {
      sentencebase = sentence;
      if (!sentence) throw new SyntaxError('No String found for subject');
      base = parsed.compound.base;
      for (let i = 0; i < sentence.length; i++) {
        if (sentencebase[i] === ',') {
          console.log('found First clause: ', sentencebase.substring(0, i).toString());
          console.log('found secondary clause: ', sentencebase.substring(i, sentencebase.length -1));
          return {
            lastClause: sentencebase.substring(i, sentencebase.length - 1).toString(),
            firstClause: sentencebase.substring(0, i).toString(),
            type: 'compound_base',
          };
        };
      }
    }
    const data = findSubject_ComplexBase(sentencebase);
    return {type: data.type};
  };
  static structure(structure: string): any {
    const oldString = structure = this.prevStruct(structure);
    // COMPLETE: Cross Reference Sentence Structure to Response Structure.
    let check = (/((compound_base)|(compound_conj))/gi).test(oldString);
    if (!!check) {
      const struct = 'compound_base';
    } else {
      check = (/((complex_base)|(complex_base_two)|(complex_compound))/gi).test(oldString);
      if (!!check) {
        const struct = 'complex_base';
      } else {
        check = (/((simple))/gi).test(oldString);
        if (!!check) {
          const struct = 'simple';
        } else throw new Error('Could not find structure type for ' + oldString);
      }
    }
    // TODO: Use sentimood to find key words to better predict a response
    return;
  }
}
