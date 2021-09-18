import Base, { Level } from "../Base";

export default class BuilderHero extends Base {
    constructor(infos: HeroInfo) {
        const easyArray: Array<Level> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: "builderElixir",
            costs: infos.levels[i].costs,
            upgradeDuration: infos.levels[i].upgradeDuration
        });
        super({
            id: infos.id,
            name: infos.name,
            type: "hero",
            village: "builder",
            levels: easyArray
        });
    };
};

interface HeroInfo {
    id?: string;
    name: string;
    levels: Array<Level>;
};