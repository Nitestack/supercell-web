import { model, Schema, SchemaTypes, Document } from "mongoose";

interface User extends Document {
    username: string;
    email: string;
    password: string;
    roles: Array<any>;
};

export default model<User>("user", new Schema({
    username: SchemaTypes.String,
    email: SchemaTypes.String,
    password: SchemaTypes.String,
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }]
}));