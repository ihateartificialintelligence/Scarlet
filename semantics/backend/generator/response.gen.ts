/* eslint-disable max-len */
/* eslint-disable no-multi-str */
const shyArray: string[] = ['...', '-'];
const ExtroArray: string[] = ['?!', '!!!', '!', '!?!?'];
const cuteArray: string[] = ['💖', '💗', '~', '<3', '*wink*'];
import * as fs from 'fs';
const scarletBot = require('../src/AFINN');

/**
 *
 *
 * @param {string} json
 * @return {*}
 */
function json2array(json: string) {
  const result = [];
  const keys = Object.keys(json);
  keys.forEach(function(key) {
    result.push(json[key]);
  });
  return result;
}


/**
 *
 *
 * @export
 * @class Responses
 */
export default class Responses {
  /**
   * Creates an instance of Responses.
   * @param {*} [scarlet]
   * @param {string} [persona]
   * @memberof Responses
   */
  constructor(scarlet ? : any, persona ? : string) {
    if (!scarlet || !persona) {
      throw new Error('No Scarlet Classifier, or Persona has been specified');
    }
    if (typeof persona !== 'string') {
      throw new TypeError('Persona must be a String');
    }
  }
  /**
     *
     *
     * @static
     * @param {String} string
     * @return {String}
     * @memberof Responses
     */
  static async getInput(string: string) {
    if (!string || typeof string !== 'string') {
      throw new TypeError('Invalid String Literal.');
    }
    return string;
  }
  /**
     * TODO: build off generated words and input - Creates appropriate response
     * Follow: https://academicguides.waldenu.edu/writingcenter/grammar/sentencestructure
     * @static
     * @param {Number} uid
     * @param {*} response
     * @param {String} personality
     * @return {*}
     * @memberof Responses
     */
  static async adjustResponse(
      uid: number,
      response: any,
      personality ? : string,
  ) {
    try {
      response = await this.getInput(response);
      this.generateResponse(uid);
    } catch (e) {
      console.error(e);
    } finally {
      let newResponse;
      switch (personality) {
        case 'introvert' || 'shy':
          newResponse = shyArray[~Math.floor(Math.random() * shyArray.length)];
          response.replace('.', newResponse);
          const idata = fs.readFileSync('./database/Word-Dict.json', {
            encoding: 'utf8',
            flag: 'r',
          });
          const iafinn: any = json2array(idata);
          response = iafinn[~Math.random() * iafinn.length];
          return response;
        case 'extrovert':
          newResponse =
                        ExtroArray[~Math.floor(
                            Math.random() * ExtroArray.length)];
          response.replace('.', newResponse);
          const edata = fs.readFileSync('./database/Word-Dict.json', {
            encoding: 'utf8',
            flag: 'r',
          });
          const eafinn: any = json2array(edata);
          response = eafinn[~Math.random() * eafinn.length];
          return response;
        case 'neutral':
          const ndata = fs.readFileSync('./database/Word-Dict.json', {
            encoding: 'utf8',
            flag: 'r',
          });
          const nafinn: any = json2array(ndata);
          response = nafinn[~Math.random() * nafinn.length];
          return response;
        case 'cute':
          newResponse =
                        cuteArray[~Math.floor(
                            Math.random() * cuteArray.length)];
          response.replace('.', newResponse);
          const cdata = fs.readFileSync('./database/Word-Dict.json', {
            encoding: 'utf8',
            flag: 'r',
          });
          const cafinn: any = json2array(cdata);
          response = cafinn[~Math.random() * cafinn.length];
          return response;
        case null:
          response.replace('.', '.');
          return response;
      }
    }
  }

  /**
     * COMPLETED: Added a generator to come up with suitable responses
     *
     * @static
     * @param {Number} uid
     * @param {string} [input]
     * @param {string} [personality]
     * @return {*}
     * @memberof Responses
     */
  static async generateResponse(
      uid: number,
      input ? : string,
      personality ? : string,
  ) {
    if (!personality) personality = 'neutral';
    // Generate responses based off AFINN
    const analysis = require('../../models/sentimood')(input || 'test');
    if (analysis.topic >= 0) {} else {
      // redirect to help services
    }

    // eslint-disable-next-line padded-blocks
    // const scarletBot = require('../src/AFINN');
    scarletBot.start();
    return say(input);
  }
};

/**
           *
           *
           * @param {string} input
           * @return {*}
           */
function say(input: string): any {
  const reply = scarletBot.reply(input);
  if (reply == scarletBot.bye()) {
    return scarletBot.bye();
  }
}
