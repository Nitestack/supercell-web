import Base, { Level } from "../Base";
import { required, NewLevel } from "./HomeOffense";

export default class HomePet extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<Level | NewLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "darkElixir",
           //@ts-ignore
           costs: infos.levels[i].text ? 0 : infos.levels[i].costs,
           //@ts-ignore
           upgradeDuration: infos.levels[i].text ? "0s" : infos.levels[i].upgradeDuration,
           //@ts-ignore
           text: infos.levels[i].text ? required(infos.levels[i].text) : null
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "pet",
            village: "home",
            levels: easyArray
        });
    };
};

interface HeroInfo {
    id?: string;
    name: string;
    levels: Array<Level | NewLevel>;
};