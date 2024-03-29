import ms from "ms";
import humanizer from "humanize-duration";
import prettyMS from "pretty-ms";
import { townHall } from "../Database/Clash of Clans/Home/townHall";
import { builderHall } from "../Database/Clash of Clans/Builder/builderHall";
import { compileFile, LocalsObject, Options } from "pug";
import { app } from "../../index";
import { join } from "path";
import { CRCard } from "../../API/Interfaces/clashRoyale";
import { ClashRoyaleConstants } from "../Database/Constants/clashRoyale";

export default class Util {
    /**
     * Returns the rarity of a Clash Royale card
     * @param {CRCard} card The card
     */
    public static getRarityOfClashRoyaleCard(card: CRCard) {
        return card.maxLevel == ClashRoyaleConstants.maxLevel ? "common" : (card.maxLevel == ClashRoyaleConstants.maxLevel - 2 ? "rare" : (card.maxLevel == ClashRoyaleConstants.maxLevel - 5 ? "epic" : "legendary"));
    };
    public static getLevelOfClashRoyaleCard(card: CRCard) {
        return card.level + (ClashRoyaleConstants.maxLevel - card.maxLevel);
    };
    /**
     * Checks for an hash and adds it if it is not included
     * @param {string} tag The player tag 
     */
    public static checkForHash(tag: string) {
        tag = tag.toUpperCase();
        return tag.includes("#") ? tag.toUpperCase() : `#${tag.toUpperCase()}`;
    };
    /**
     * Compiles a pug template an returns a html code
     * @param {string} path The path at the ../Views direction 
     * @param {Options?} options The compile options  
     * @param {LocalsObject?} locals The locals accessable in the pug template
     */
    public static compilePUGFile(path: string, options?: Options, locals?: LocalsObject) {
        try {
            const compileFunction = compileFile(join(__dirname, "..", "..", "Website", "Views", path), options);
            return compileFunction({ ...app.locals, ...locals });
        } catch (err) {
            console.log(err);
        };
    };
    /**
     * Rounds a number
     * @param {number} number The number to round 
     * @param {number} decimalPlaces The amount of decimal places that will be returned 
     */
    public static round(number: number, decimalPlaces: number) {
        const factorOfTen = Math.pow(10, decimalPlaces);
        return Math.round(number * factorOfTen) / factorOfTen;
    };
    /**
     * Shorts the time
     * @param {string} text The text to short
     */
    public static shortener(text: string) {
        const textArray = text.split(" ");
        for (const textPiece of textArray) if (["0m", "0s", "0ms"].includes(textPiece)) textArray.splice(textArray.indexOf(textPiece), 1);
        if (!text.toLowerCase().includes("d") && !text.toLowerCase().includes("h") && !text.toLowerCase().includes("m")) return "1m";
        return textArray.slice(0, text.toLowerCase().includes("d") ? 3 : (!text.toLowerCase().includes("h") ? 1 : 2)).join(" ");
    };
    /**
     * Gets the percentage between two dates compared to today
     * @param {number} start The start date in milliseconds
     * @param {number} end The end date in milliseconds
     */
    public static getPercentage(start: number, end: number) {
        return Math.round(((Date.now() - start) / (end - start)) * 100) + '%';
    };
    /**
     * Resolves a database name
     * @param {string} name The name to resolve
     */
    public static resolveDatabaseName(name: string) {
        return name.includes("BuildersHut") ? "Builder's Hut" : (name.includes("XBow") ? "X-Bow" : (isNaN(name.charAt(name.length - 1) as unknown as number) ? name : name.slice(0, -1)).replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'));
    };
    /**
     * Converts a resolved name into a database name
     * @param {string} name The resolved name
     */
    public static convertToDatabaseName(name: string) {
        return name.replace(/ /g, "").replace(/-/g, "").replace(/'/g, "");
    };
    /**
     * Converts a resolved name into a JavaScript variable name
     * @param {string} name The resolved name
     */
    public static convertToVariableName(name: string) {
        return name[0].toLowerCase() + name.slice(1).replace(/ /g, "").replace(/-/g, "_").replace(/\./g, "").replace(/'/g, "");
    };
    /**
     * Get item of hall
     * @param {string} name The resolved name of the element 
     * @param {number} hallLevel The level of the hall
     * @param {"home" | "builder"} village
     */
    public static getHallItem(name: string, hallLevel: number, village: "home" | "builder"): {
        maxLevel: number,
        amount: number
    } | number {
        return (village == "home" ? townHall : builderHall)[hallLevel - 1][this.convertToVariableName(name)];
    };
    /**
     * Converts various time formats into seconds
     * @param {string} time The time format
     */
    public static convertTime(time: string) {
        const arrayOfTime: Array<string> = time.split(" ");
        const newArray: Array<number> = [];
        for (const timeS of arrayOfTime) newArray.push(ms(timeS));
        return newArray.reduce((a, b) => a + b, 0) / 1000;
    };
    /**
     * Converts time in milliseconds into various time formats
     * @param {number} timeInMilliseconds The time in milliseconds
     * @param {boolean?} short whether the time format should be in short format
     * @param {string?} language The language of the user
     */
    public static convertMilliseconds(timeInMilliseconds: number, short?: boolean, language?: string,) {
        return short ? prettyMS(timeInMilliseconds) : humanizer(timeInMilliseconds, {
            units: ["mo", "d", "h", "m", "s"],
            language: language ? `${language[0]}${language[1]}` : null,
            delimiter: " ",
            fallbacks: ["en"]
        });
    };
    /**
     * Converts number into short style of it
     * @param {number} number The number to convert
     */
    public static convertNumber(number: number) {
        if (number < 1000) return number.toString();
        else if (number < 1000000) return (number / 1000).toString() + "k";
        else if (number < 1000000000) return (number / 1000000).toString() + "M";
        else if (number < 1000000000000) return (number / 1000000000).toString() + "B";
        else return (number / 1000000000000).toString() + "T";
    };
    /**
     * Converts gems in time (milliseconds)
     * @param {number} gems The gems to convert 
     * @param {string} village The village name
     */
    public static gemsToTime(gems: number, village?: "home" | "builder") {
        var r: Array<number>, i: Array<number>, u: number;
        village = typeof village != "undefined" ? village : "home";
        r = [60, 3600, 86400, 604800];
        switch (village) {
            case "builder":
                i = [1, 50, 500, 2e3];
                break;
            default:
                i = [1, 20, 260, 1e3]
        };
        return (u = 0, isNaN(gems) && (gems = 0), gems < 0 && (gems = 0), gems == 0) ? 0 : gems <= i[0] ? 246 : gems <= i[1] ? Math.ceil((gems - i[0]) * ((r[1] - r[0]) / (i[1] - i[0])) + r[0]) : gems <= i[2] ? Math.ceil((gems - i[1]) * ((r[2] - r[1]) / (i[2] - i[1])) + r[1]) : Math.ceil((gems - i[2]) * ((r[3] - r[2]) / (i[3] - i[2])) + r[2]);
    };
    /**
     * Converts a time in seconds to gems
     * @info Edit in ../TS/Upgrade/mainIndex.ts too
     * @param {number} timeInSeconds The time to convert in seconds 
     * @param {string} village The village name
     */
    public static timeToGems(timeInSeconds: number, village?: "home" | "builder") {
        var r: Array<number>, u: Array<number>, i: number, f: number, gems: number;
        village = typeof village != "undefined" ? village : "home";
        r = [60, 3600, 86400, 604800];
        switch (village) {
            case "builder":
                u = [1, 50, 500, 2e3];
                break;
            default:
                u = [1, 20, 260, 1e3]
        };
        if (isNaN(timeInSeconds) && (timeInSeconds = 0), timeInSeconds < 0) return 0;
        if (timeInSeconds == 0) gems = 0;
        else if (timeInSeconds <= 246) gems = u[0];
        else {
            for (i = 3,
                f = 1; f < r.length; f++)
                if (timeInSeconds <= r[f]) {
                    i = f;
                    break
                }
            gems = Math.floor((timeInSeconds - r[i - 1]) * (u[i] - u[i - 1]) / (r[i] - r[i - 1])) + u[i - 1];
            gems == 0 && timeInSeconds > 0 && (gems = 1)
        };
        return gems < 0 && (gems = 0), gems;
    };
    /**
     * Gets the the smallest value of 
     * @param {Array<number>} input The numbers to compare 
     */
    public static min(input: Array<number>) {
        if (toString.call(input) !== "[object Array]") return false;
        return Math.min.apply(null, input);
    };
    /**
     * Removes duplicated values of an array
     * @param {Array<any>} values The array
     */
    public static removeDuplicates(values: Array<any>) {
        const newArray = [];
        for (const value of values) if (!newArray.includes(value)) newArray.push(value);
        return newArray;
    };
};