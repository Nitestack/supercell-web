import Base, { Level } from "../Base";

export default class HomeArmy extends Base {
    constructor(infos: ArmyInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "elixir",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "army",
            village: "home",
            levels: easyArray
        });
    };
};

interface ArmyInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};