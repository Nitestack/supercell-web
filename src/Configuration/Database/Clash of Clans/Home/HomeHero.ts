import Base, { Level } from "../Base";

export default class HomeHero extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.name == "Grand Warden" ? "elixir" : "darkElixir",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "hero",
            village: "home",
            levels: easyArray
        });
    };
};

interface HeroInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};