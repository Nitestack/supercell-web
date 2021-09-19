import Base, { Level } from "../Base";
import { required, NewLevel } from "../Home/HomeOffense";

export default class BuilderTroop extends Base {
    constructor(infos: TroopInfo) {
        const easyArray: Array<Level | NewLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "builderElixir",
            //@ts-ignore
            costs: infos.levels[i].text ? 0 : infos.levels[i].costs,
            //@ts-ignore
            upgradeDuration: infos.levels[i].text ? "0s" : infos.levels[i].upgradeDuration,
            //@ts-ignore
            text: infos.levels[i].text ? required(infos.levels[i].text) : null,
            //@ts-ignore
            requiredLabLevel: i == 0 ? null : infos.levels[i].requiredLabLevel
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "troop",
            village: "builder",
            levels: easyArray
        });
    };
};

interface TroopInfo {
    id?: string;
    name: string;
    levels: Array<Level | NewLevel>;
};