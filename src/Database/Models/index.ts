import { FilterQuery } from "mongoose";
import userModel, { User } from "./user";
import roleModel from "./role";
import cocVillageModel, { ClashOfClansVillage } from "./clashofclans";

export default class DatabaseManager {
    public static User = userModel;
    public static Role = roleModel;
    public static ClashOfClansVillage = cocVillageModel;
    public static ROLES = ["user", "admin", "moderator"];
    public static async getUserById(id: string) {
        return await this.User.findById(id);
    };
    public static async getUser(filter: FilterQuery<User>) {
        return await this.User.findOne(filter);
    };
    public static async getClashOfClansVillage(filter: FilterQuery<ClashOfClansVillage>) {
        return await this.ClashOfClansVillage.findOne(filter);
    };
};