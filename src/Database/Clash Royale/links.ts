export function createDeckLink(cardIDs: Array<number>, war?: boolean) {
    let link = "https://link.clashroyale.com/deck/en?deck=";
    for (const cardID of cardIDs) link += `${cardID};`;
    link = link.slice(0, -1);
    if (war) link += "&war=1";
    return link;
};