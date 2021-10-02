$(".army-click").on("input", function () {
    const inputField = document.getElementById("armyLink");
    const housingSpaceInputField = document.getElementById("armySpace");
    const spellSpaceInputField = document.getElementById("spellSpace");
    const appURLButton = document.getElementById("openApp");
    this.setAttribute("data-amount", `${parseInt(this.getAttribute("data-amount")) + 1}`);
    let urlString = "";
    let appString = "";
    let troopFirstTime = true;
    let spellFirstTime = true;
    let troopHousingSpace = 0;
    let spellHousingSpace = 0;
    $(".troops").each(function () {
        setURL(this, "troop");
    });
    $(".dark-troops").each(function () {
        setURL(this, "troop");
    });
    $(".siege-machines").each(function () {
        setURL(this, "siegeMachine");
    });
    $(".spells").each(function () {
        setURL(this, "spell");
    });
    appString = baseAppURL + urlString;
    urlString = baseURL + urlString;
    inputField.value = urlString;
    appURLButton.href = appString;
    housingSpaceInputField.value = `Troop Housing Space: ${troopHousingSpace}`;
    spellSpaceInputField.value = `Spell Housing Space: ${spellHousingSpace}`;
    function setURL(element, housingSpaceType) {
        if (element.value && parseInt(element.value) >= 0 && parseInt(element.value) <= parseInt(element.max) && parseInt(element.value) != 0) {
            const type = element.getAttribute("data-prefix");
            if (!urlString.includes(type))
                urlString += type;
            urlString += `${(troopFirstTime && housingSpaceType == "troop") || (spellFirstTime && housingSpaceType == "spell") ? "" : "-"}${element.value}x${element.getAttribute("data-id")}`;
            if (troopFirstTime && housingSpaceType == "troop")
                troopFirstTime = false;
            else if (spellFirstTime && housingSpaceType == "spell")
                spellFirstTime = false;
            if (housingSpaceType == "troop")
                troopHousingSpace += parseInt(element.value) * parseInt(element.getAttribute("data-space"));
            else if (housingSpaceType == "spell")
                spellHousingSpace += parseInt(element.value) * parseInt(element.getAttribute("data-space"));
        }
        ;
    }
    ;
});
document.getElementById("copyLink").onclick = function () {
    if (document.getElementById("armyLink").value)
        navigator.clipboard.writeText(document.getElementById("armyLink").value);
};
const baseURL = "https://link.clashofclans.com/en?action=CopyArmy&army=";
const baseAppURL = "clashofclans://action=CopyArmy&army=";
//# sourceMappingURL=cocArmy.js.map