import Base, { Level } from "../Base";

export default class HomeResources extends Base {
    constructor(infos: ResourceInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.name.includes("Gold") || infos.name == "Dark Elixir Storage" ? "elixir" : "gold",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "resource",
            village: "home",
            levels: easyArray
        });
    };
};

interface ResourceInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};