import Base, { Level } from "../Base";

export default class HomeOffense extends Base {
    constructor(infos: OffenseInfo) {
        const easyArray: Array<Level | NewLevel> = [];
        for (let i = 0; i < infos.levels.length; i++) easyArray.push({
            costType: infos.type == "siegeMachine" ? "elixir" : infos.costType,
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
            type: infos.type,
            village: "home",
            levels: easyArray
        });
    };
};

export function required(text: string) {
    const arrayOfText = text.split(" ");
    return `Level ${arrayOfText[arrayOfText.length - 1]} ${arrayOfText.slice(0, arrayOfText.length - 2).join(" ")} Required!`;
};

interface OffenseInfo {
    id?: string;
    name: string;
    levels: Array<NewLevel | Level>;
    costType?: "elixir" | "darkElixir";
    type: "troop" | "spell" | "siegeMachine" | "darkTroop"
};

export interface NewLevel extends Level {
    text: string;
    requiredLabLevel: number;
}