import mongoose from "mongoose";
import user from "./user";
import role from "./role";

export default class MongoDBManager {
    public static mongoose = mongoose;
    public static User = user;
    public static Role = role;
    public static ROLES = ["user", "admin", "moderator"];
};