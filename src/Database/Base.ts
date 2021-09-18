import Util from "../Util";

export default class Base {
    constructor(infos: BaseInfo){
        this.name = infos.name;
        this.type = infos.type;
        this.village = infos.village;
        const convertedLevels: Array<Level> = [];
        for (const level of infos.levels) convertedLevels.push({
            ...level,
            convertedPrice: Util.convertNumber(level.costs),
            upgradeDurationInSeconds: Util.convertTime(level.upgradeDuration),
            calculateSeasonBoostCosts: (percentage: 0 | 10 | 15 | 20) => {
                return level.costs - (percentage / 100 * level.costs);
            },
            calculateSeasonBoostTimeInSeconds: (percentage: 0 | 10 | 15 | 20) => {
                if (percentage == 0) return Util.convertTime(level.upgradeDuration);
                const upgradeDurationInMS = Util.convertTime(level.upgradeDuration) * 1000;
                let time = Util.convertMilliseconds(upgradeDurationInMS - ((percentage / 100) * upgradeDurationInMS), true);
                let arrayOfTime = time.split(" ");
                if (arrayOfTime.length >= 2) time = `${arrayOfTime[0]} ${arrayOfTime[1]}`;
                if (time.includes("m")) {
                    const newArrayOfTime = time.split(" ");
                    for (let i = 0; i < newArrayOfTime.length; i++) {
                        if (newArrayOfTime[i].toLowerCase().includes("m") && newArrayOfTime[i].length - 1 == 2 && (newArrayOfTime.length == 2 ? true : parseInt(newArrayOfTime[i].slice(0, 2)) > 20)) {
                            newArrayOfTime.splice(i, 1, `${Math.floor(parseInt(newArrayOfTime[i]) / 10)}0m`);
                            break;
                        };
                    };
                    time = newArrayOfTime.join(" ");
                };
                return Util.convertTime(time);
            }
        });
        this.levels = convertedLevels;
        this.maxLevel = infos.levels.length;
    };
    public name: string;
    public type: Type;
    public village: Village;
    public maxLevel: number;
    public levels: Array<Level>;
};

export type Type = "defense" | "resource" | "army" | "trap" | "troop" | "spell" | "hero" | "pet" | "siegeMachine" | "darkTroop" | "wall";
export type Village = "home" |  "builder";

interface BaseInfo {
    name: string;
    id?: string;
    village: Village;
    type: Type;
    levels: Array<Level>;
};

export interface Level {
    costType?: "gold" | "elixir" | "darkElixir" | "builderGold" | "builderElixir" | "goldAndElixir" | "builderGoldAndElixir" | "gem";
    costs: number;
    upgradeDuration: string;
    convertedPrice?: string;
    upgradeDurationInSeconds?: number;
    calculateSeasonBoostCosts?: (percentage: 0 | 10 | 15 | 20) => number;
    calculateSeasonBoostTimeInSeconds?: (percentage : 0 | 10 | 15 | 20) => number;
};