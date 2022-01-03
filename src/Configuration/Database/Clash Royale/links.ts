export function createDeckLink(cardIDs: Array<number>, isMobile?: boolean, war?: boolean) {
    let link = isMobile ? "clashroyale://copyDeck?deck=" : "https://link.clashroyale.com/deck/en?deck=";
    for (const cardID of cardIDs) link += `${cardID};`;
    link = link.slice(0, -1);
    if (war) link += "&war=1";
    return link;
};

export function openProfile(tag: string, isMobile?: boolean) {
    return (isMobile ? "clashroyale://playerInfo?id=" : "https://link.clashroyale.com/en?playerInfo?id=") + tag.toUpperCase().replace(/#/g, "");
};

export function openClan(tag: string, isMobile?: boolean) {
    return (isMobile ? "clashroyale://clanInfo?id=" : "https://link.clashroyale.com/en?clanInfo?id=") + tag.toUpperCase().replace(/#/g, "");
};