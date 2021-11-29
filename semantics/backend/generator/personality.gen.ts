import { Persona } from "./database/scarlet.persona";
const user = require('../../../users/models/users.model');

export default class Personality {
    static async delete(uid: number, token: string) {
        //throw new Error("Method not implemented.");
        if (!uid) throw new Error("No UID found!");
        await user.removeByToken(token)
    }
    constructor(name: string, age: number, gender: string) {
        if (!name || !age || !gender) throw new Error("No Name, Age, or Gender has been specified");
        if (typeof name !== "string") throw new TypeError("Name must be a String");
        if (typeof age !== "number") throw new TypeError("Age must be a Number");
        if (typeof gender !== "string") throw new TypeError("Gender must be a String");
    }

    static async Gender(gender:string) {
        if (!gender) throw new Error("`gender` parameter expected. Instead got `null`");
        if (typeof gender !== "string") throw new TypeError("`gender` parameter not a string");
        if (gender !== ("male"||"female"||"non-binary")) throw new TypeError("Gender is not a valid gender.");
        return gender;
    };

    static async Name(name: string) {
        if (!name) throw new Error('`name` parameter expected. Instead got `null`');
        if (typeof name !== 'string') throw new TypeError('`name` parameter not a string');
        return name;
    }

    static async Age(age: number) {
        if (!age) throw new Error('`age` parameter expected. Instead got `null`');
        if (typeof age !== 'number') throw new TypeError('`age` parameter not a number');
        return age;
    }


    /**
     * Creation of Scarlet's Per-User Personality
     *
     * @static
     * @param {number} a - Age
     * @param {string} n - Name
     * @param {string} g - Gender
     * @param {number} ptype - Personality Type: Introvert, Extrovert, Neutral
     * @return {*}  {Promise<any>}
     * @memberof Personality
     */
    static async createPersonality(uid: number, a: number, n: string, g: string, ptype: number): Promise<any>{
        let name = await this.Name(n);
        let personaType:string;
        switch (ptype) {
            case ptype = 0: return personaType = "neutral".toLocaleLowerCase();
            case ptype = 1: return personaType = "Introvert".toLocaleLowerCase();
            case ptype = 2: return personaType = "Extrovert".toLocaleLowerCase();
        };
        let persona = await Persona.find({
            name: name,
        });
        try { 
            if (persona == false ) {
                let newPersona = await Persona({
                    uid: uid,
                    name: a,
                    age: a,
                    gender: g,
                    type: personaType,
                });
                await newPersona.save().catch((e) => { throw new Error(`Error whilst attempting Persona save\n${e.message}`); });
                return `Persona (${ await newPersona.name}) has been created successfully!`;
            } else {
                throw new Error(`Persona (${name}) already exists.`)
            }
        } catch (e) {
            throw new Error(`Error creating persona: ${e.message}`)
        }
    }
}

