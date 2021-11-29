import * as resGen from './generator/response.gen';
import * as perGen from './generator/personality.gen';

/**
 *
 *
 * @export
 * @class Scarlet
 */
export class Scarlet {
  /**
   *
   *
   * @param {number} uid
   * @param {*} [personality]
   * @memberof Scarlet
   */
  async createPersonality(uid:number, personality?:any) {
    await perGen.default.createPersonality(
        uid, personality.age,
        personality.name,
        personality.gender,
        personality.type,
    );
  }

  /**
   *
   *
   * @param {string} input
   * @param {number} [uid]
   * @memberof Scarlet
   */
  async getResponse(input: string, uid?:number) {
    await resGen.default.getInput(input).then(async () => {
      return await resGen.default.generateResponse(uid, input);
    });
  }


  /**
   *
   *
   * @param {string} token
   * @param {number} uid
   * @memberof Scarlet
   */
  async PurgeAI(token: string, uid: number) {
    await perGen.default.delete(uid, token).then(async () => {
      return {
        result: 'complete',
      };
    });
  }
}
