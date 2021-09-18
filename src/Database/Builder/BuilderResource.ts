import Base, { Level } from "../Base";

export default class BuilderResource extends Base {
    constructor(infos: ResourceInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.name.includes("Gold") || infos.name == "Gem Mine" ? "builderElixir" : "builderGold",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "resource",
            village: "builder",
            levels: easyArray
        });
    };
};

interface ResourceInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};