import Base, { Level } from "../Base";

export default class BuilderDefense extends Base {
    constructor(infos: DefenseInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.name.toLowerCase() == "wall" && i >= 6 ? "builderGoldAndElixir" : "builderGold",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: infos.name == "Wall" ? "wall" : "defense",
            village: "builder",
            levels: easyArray
        });
    };
};

interface DefenseInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};