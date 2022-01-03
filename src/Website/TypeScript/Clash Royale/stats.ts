//@ts-ignore
const leagueStatistics = document.getElementById("isLeagueStatistic").value;

addModuleEventListener(true);
if (leagueStatistics == "true") createCountdown(document.getElementById("crSeasonTimer"), getClashRoyaleSeasonEnd(), false, true);
setModule("profile");

function copyDeckLink() {
    if (isMobileOrTablet()) window.open(document.getElementById("copyDeckButton").getAttribute("data-mobile-link"));
    /* Copy the text inside the text field */
    navigator.clipboard.writeText(document.getElementById("copyDeckButton").getAttribute("data-link"));
};

function profileClick() {
    if (isMobileOrTablet()) window.open(document.getElementById("shareButton").getAttribute("data-mobile-link"));
    /* Copy the text inside the text field */
    //@ts-ignore
    navigator.clipboard.writeText(document.getElementById("shareButton").value);
};

function clanClick() {
    if (isMobileOrTablet()) window.open(document.getElementById("clanProfile").getAttribute("data-mobile-link"));
    /* Copy the text inside the text field */
    //@ts-ignore
    navigator.clipboard.writeText(document.getElementById("clanProfile").value);
};