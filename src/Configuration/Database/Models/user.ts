import { model, Schema, SchemaTypes, Document, SchemaType } from "mongoose";

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    roles: Array<string>;
    clashOfClansVillages?: Array<string>;
};

export default model<User>("user", new Schema({
    username: {
        type: SchemaTypes.String,
        required: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    clashOfClansVillages: [{
        type: SchemaTypes.ObjectId,
        ref: "ClashOfClansVillage"
    }]
}));