export default class Link {
    public static getPlayerLink(tag: string) {
        return "https://link.clashofclans.com/de?action=OpenPlayerProfile&tag=" + encodeURIComponent(tag.replace(/#/g, ""));
    };
};