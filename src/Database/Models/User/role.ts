import { model, Schema, Document } from "mongoose";

interface Role extends Document {
    name: string;
};

export default model<Role>("role", new Schema({
    name: String
}));