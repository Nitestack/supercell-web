import { model, Schema, SchemaTypes, Document } from "mongoose";
import { Player } from "../../API/index";
import Util from "../../Util";

export interface PlayerSchema extends Document {
    playerTag: string;
    player: Player;
    homeVillage: object;
    builderBase: object;
    builderSeasonBoost: 0 | 10 | 15 | 20;
    researchSeasonBoost: 0 | 10 | 15 | 20;
    homeVillageBuilder: Array<Builder>;
    builderBaseBuilder?: Array<Builder>;
    homeLab?: Array<Laboratory>;
    builderLab?: Array<Laboratory>;
    petHouse?: Array<PetHouse>;
    otto: {
        unlocked: boolean;
        builder: Array<Builder>;
        currentVillage: "home" | "builder"
    }
};

export interface Builder {
    name: string;
    id: number;
    start: Date;
    currentLevel: number;
    durationInMilliseconds: number;
};

export interface Laboratory {
    name: string;
    start: Date;
    durationInMilliseconds: number;
    currentLevel: number;
};

export interface PetHouse {
    name: string;
    start: Date;
    durationInMilliseconds: number;
    currentLevel: number;
}

const requiredString = {
    type: SchemaTypes.String,
    required: true
};
const requiredNumber = {
    type: SchemaTypes.Number,
    required: true
};

export default model<PlayerSchema>("player-schema", new Schema({
    playerTag: {
        type: SchemaTypes.String,
        required: true
    },
    player: {},
    homeVillage: {},
    builderBase: {},
    builderSeasonBoost: {
        type: SchemaTypes.Number,
        required: true
    },
    researchSeasonBoost: {
        type: SchemaTypes.Number,
        required: true
    },
    homeVillageBuilder: {
        type: [{
            name: requiredString,
            id: requiredNumber,
            start: {
                type: SchemaTypes.Date,
                required: true
            },
            durationInMilliseconds: requiredNumber,
            currentLevel: requiredNumber
        }],
        required: true
    },
    builderBaseBuilder: [{
        name: requiredString,
        id: requiredNumber,
        start: {
            type: SchemaTypes.Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    homeLab: [{
        name: requiredString,
        start: {
            type: SchemaTypes.Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    builderLab: [{
        name: requiredString,
        start: {
            type: SchemaTypes.Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    petHouse: [{
        name: requiredString,
        start: {
            type: SchemaTypes.Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    otto: {
        type: {
            unlocked: {
                type: SchemaTypes.Boolean,
                required: true,
                default: false
            },
            builder: {
                type: [{
                    name: requiredString,
                    id: requiredNumber,
                    start: {
                        type: SchemaTypes.Date,
                        required: true
                    },
                    durationInMilliseconds: requiredNumber,
                    currentLevel: requiredNumber
                }],
                required: true,
                default: []
            },
            currentVillage: {
                type: SchemaTypes.String,
                required: true,
                default: "builder"
            }
        },
        required: true
    }
}), "player-schema");