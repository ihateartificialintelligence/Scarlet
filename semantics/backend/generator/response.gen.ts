/* eslint-disable max-len */
/* eslint-disable no-multi-str */
const shyArray: string[] = ['...', '-'];
const ExtroArray: string[] = ['?!', '!!!', '!', '!?!?'];
const cuteArray: string[] = ['💖', '💗', '~', '<3', '*wink*'];
import {
  analyze,
} from '../src/AFINN';
import * as fs from 'fs';


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
    let response: string;
    // Generate responses based off AFINN
    const toBlock: any = new Map();
    let negCount: number;
    const analysis = analyze(input || 'test');
    if (analysis.topic >= 0) {} else {
      // redirect to help services
    }

    switch (analysis.topic) {
      case analysis.topic >= 0:
        // treat the topics as normal
        if (analysis.score <= -1) {
          negCount++;
          toBlock.set(uid, negCount);
          if (uid in toBlock && negCount > 3) {
            const blockData: any = [{
              userId: uid,
              reason: 'blocked for breaching ToS',
            }];
            fs.writeFileSync('./database/block-users.json', blockData, {
              encoding: 'utf8',
              mode: 'a+',
            });
            return {
              banned: true,
              reason: 'User has been persistent on negative count (Bad Words)',
            };
          } else {
            let blkUsr = require('./database/blocked-users.json');
            blkUsr = JSON.parse(blkUsr);
            for (let i = 0; i < blkUsr.length; i++) {
              if (blkUsr[i].userId == uid) {
                return {
                  response: 401,
                  reason: blkUsr[i].reason,
                  userId: blkUsr[i].userId,
                };
              } else {
                return;
              }
            }
          }
          response = await this.adjustResponse(uid, input);
          if (analyze(response).score <= -1) {
            return (response =
                            'Sorry but I can\'t \
                            tolerate such mean behaviour *sigh*'
            );
          } else {
            return (response = 'I can\'t tolerate such rude behaviour *sigh*');
          }
        } else if (analysis.score == 0) {
          response = await this.adjustResponse(uid, input);
          if (analyze(response).score <= -1) {
            return (response =
                            'Sorry but I don\'t think I could find a good response to that *pout*');
            // TODO: Add ML learning to new responses
          } else return response;
        } else if (analysis.score >= 1) {
          response = await this.adjustResponse(uid, input);
          if (analyze(response).score <= -1) {
            return (response =
                            'Sorry but I don\'t think I could find a good response to that *pout*');
            // TODO: Add ML learning to new responses
          } else return response;
        }
        break;
      case analysis.topic == 'suicide':
        // TODO: Add Redirect to help line based on analysis
        return {
          link: 'help-line',
          phone: 'hotline',
          reassurance: 'Some reassurance',
        };
    }
  }
}
