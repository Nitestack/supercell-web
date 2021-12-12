import { model, Schema, SchemaTypes, Document } from "mongoose";
import { Player } from "clashofclans.js";

export interface ClashOfClansVillage extends Document {
    playerTag: string;
    player: Player;
    homeVillage: object;
    builderBase: object;
    builderSeasonBoost: 0 | 10 | 15 | 20;
    researchSeasonBoost: 0 | 10 | 15 | 20;
    homeVillageBuilder: Array<Builder>;
    builderBaseBuilder: Array<Builder>;
    homeLab: Array<Laboratory>;
    builderLab: Array<Laboratory>;
    petHouse: Array<PetHouse>;
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

export default model<ClashOfClansVillage>("clashofclansvillage", new Schema({
    playerTag: {
        type: SchemaTypes.String,
        required: true
    },
    player: {},
    homeVillage: {
        type: {},
        required: true,
        default: {}
    },
    builderBase: {
        type: {},
        required: true,
        default: {}
    },
    builderSeasonBoost: {
        type: SchemaTypes.Number,
        required: true,
        default: 0
    },
    researchSeasonBoost: {
        type: SchemaTypes.Number,
        required: true,
        default: 0
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
    builderBaseBuilder: {
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
    homeLab: [{
        name: requiredString,
        start: {
            type: SchemaTypes.Date,
            required: true
        },
        durationInMilliseconds: requiredNumber,
        currentLevel: requiredNumber
    }],
    builderLab: {
        type: [{
            name: requiredString,
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
    petHouse: {
        type: [{
            name: requiredString,
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
}));