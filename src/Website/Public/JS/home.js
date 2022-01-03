$("div[data-end-time]").each(function () {
    const element = this;
    const milliseconds = parseInt(element.getAttribute("data-end-time"));
    const interval = setInterval(displayCountdown, 1000);
    function displayCountdown() {
        // Find the distance between now and the count down date
        const distance = milliseconds - Date.now();
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        // Display the result in the element with
        element.textContent = `New Event in: ${days != 0 ? `${days}d ` : ""}${hours != 0 ? `${hours}h ` : ""}${minutes != 0 ? `${minutes}m` : ""}`;
        // If the count down is finished
        if (distance < 0) {
            clearInterval(interval);
            location.reload();
        }
        ;
    }
    ;
});
let megaCrabEnd;
let megaCrabBegin;
for (const element of ["cwl", "clanGames", "cocSeasonEnd", "cocLeagueReset", "bsLeagueReset", "bsSeasonEnd", "powerLeague", "crLeagueReset", "crSeasonEnd", "megaCrab", "tribeBoost", "bbSeasonEnd", "intelReset", "forcePointsDecrease"]) {
    let date = new Date();
    date.setUTCMinutes(0);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    let active = false;
    let activeMegaCrab = false;
    //Clash of Clans
    if (element == "cwl") {
        const activeDays = [2, 3, 4, 5, 6, 7, 8, 9];
        //Active CWL
        if (activeDays.includes(date.getUTCDate()) || (date.getUTCDate() == 1 && date.getUTCHours() > 8) || (date.getUTCDate() == 10 && date.getUTCHours() < 8)) {
            active = true;
            date.setUTCDate(10);
        }
        else {
            if (date.getUTCMonth() == 11)
                date.setUTCFullYear(date.getUTCFullYear() + 1);
            date.setUTCMonth(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1);
            date.setUTCDate(1);
        }
        ;
        date.setUTCHours(8);
    }
    else if (element == "cocSeasonEnd") {
        active = true;
        const thisMonthSeasonBegin = date;
        thisMonthSeasonBegin.setUTCDate(1);
        thisMonthSeasonBegin.setUTCHours(8);
        if (Date.now() > thisMonthSeasonBegin.getTime()) {
            if (date.getUTCMonth() == 11)
                date.setUTCFullYear(date.getUTCFullYear() + 1);
            date.setUTCMonth(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1);
        }
        else
            date = thisMonthSeasonBegin;
    }
    else if (element == "cocLeagueReset") {
        active = true;
        const thisMonthLastMonday = getLastMonday(date.getUTCMonth(), date.getUTCFullYear());
        if (Date.now() > thisMonthLastMonday.getTime())
            date = getLastMonday(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1, date.getUTCMonth() == 11 ? date.getUTCFullYear() + 1 : date.getUTCFullYear());
        else
            date = thisMonthLastMonday;
    }
    else if (element == "clanGames") {
        const newDate = new Date();
        newDate.setUTCHours(8);
        newDate.setUTCMinutes(0);
        newDate.setUTCSeconds(0);
        newDate.setUTCMilliseconds(0);
        active = false;
        const thisMonthCGBegin = newDate;
        thisMonthCGBegin.setUTCDate(22);
        const thisMonthCGEnd = newDate;
        thisMonthCGEnd.setUTCDate(28);
        const nextMonthCGBegin = newDate;
        nextMonthCGBegin.setUTCDate(22);
        nextMonthCGBegin.setUTCMonth(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1);
        if (date.getUTCMonth() == 11)
            nextMonthCGBegin.setUTCFullYear(date.getUTCFullYear() + 1);
        //Active clan games in this month or next month next clan games
        if (Date.now() > thisMonthCGBegin.getTime()) {
            //Next month next clan games
            if (Date.now() > thisMonthCGEnd.getTime()) {
                active = false;
                date = nextMonthCGBegin;
            }
            else {
                active = true;
                date = thisMonthCGEnd;
            }
            ;
        }
        else
            date = thisMonthCGBegin;
    }
    //Brawl Stars
    else if (element == "bsLeagueReset") {
        active = true;
        let leagueResetStart = new Date();
        leagueResetStart.setUTCFullYear(2021);
        leagueResetStart.setMonth(7);
        leagueResetStart.setUTCDate(23);
        leagueResetStart.setUTCHours(8);
        leagueResetStart.setUTCMinutes(0);
        leagueResetStart.setUTCSeconds(0);
        leagueResetStart.setUTCMilliseconds(0);
        while (Date.now() > leagueResetStart.getTime()) {
            leagueResetStart = new Date(leagueResetStart.getTime() + 2419200000);
        }
        ;
        date.setUTCHours(8);
        date = leagueResetStart;
    }
    else if (element == "bsSeasonEnd") {
        active = true;
        let seasonStart = new Date();
        seasonStart.setUTCFullYear(2021);
        seasonStart.setMonth(7);
        seasonStart.setUTCDate(30);
        seasonStart.setUTCHours(9);
        seasonStart.setUTCMinutes(0);
        seasonStart.setUTCSeconds(0);
        seasonStart.setUTCMilliseconds(0);
        while (Date.now() > seasonStart.getTime()) {
            seasonStart = new Date(seasonStart.getTime() + 6048000000);
        }
        ;
        date.setUTCHours(9);
        date = seasonStart;
    }
    else if (element == "powerLeague") {
        let seasonStart = new Date();
        seasonStart.setUTCFullYear(2021);
        seasonStart.setMonth(7);
        seasonStart.setUTCDate(30);
        seasonStart.setUTCHours(9);
        seasonStart.setUTCMinutes(0);
        seasonStart.setUTCSeconds(0);
        seasonStart.setUTCMilliseconds(0);
        while (Date.now() > seasonStart.getTime()) {
            seasonStart = new Date(seasonStart.getTime() + 6048000000);
        }
        ;
        date.setUTCHours(9);
        date = seasonStart;
        //Active Power League
        if (seasonStart.getTime() - Date.now() > 345600000) {
            active = true;
            date = new Date(date.getTime() - 345600000);
        }
        ;
    }
    //Clash Royale
    else if (element == "crLeagueReset" || element == "crSeasonEnd") {
        active = true;
        date = getClashRoyaleSeasonEnd();
    }
    //Boom Beach
    else if (element == "tribeBoost") {
        active = true;
        let tribeBoostReset = new Date();
        tribeBoostReset.setUTCFullYear(2022);
        tribeBoostReset.setUTCMonth(0);
        tribeBoostReset.setUTCDate(3);
        tribeBoostReset.setUTCHours(0);
        tribeBoostReset.setUTCMinutes(0);
        tribeBoostReset.setUTCSeconds(0);
        tribeBoostReset.setUTCMilliseconds(0);
        while (Date.now() > tribeBoostReset.getTime()) {
            tribeBoostReset = new Date(tribeBoostReset.getTime() + 1109600000);
        }
        ;
        date = tribeBoostReset;
        date.setUTCHours(0);
        //If the tribe boost is gone during Mega Crab, it will be to the Mega Crab End
        if (tribeBoostReset.getTime() > megaCrabBegin.getTime() && megaCrabEnd.getTime() > tribeBoostReset.getTime())
            date = megaCrabEnd;
    }
    else if (element == "bbSeasonEnd") {
        //Active Warship Season
        if (megaCrabEnd.getTime() < Date.now() || megaCrabEnd.getTime() - 604800000 > Date.now()) {
            active = true;
            date = new Date(megaCrabEnd.getTime() - 604800000);
        }
        else {
            date = megaCrabEnd;
        }
        ;
        date.setUTCHours(8);
    }
    else if (element == "megaCrab") {
        const thisMonthMegaCrabSunday = getLastSunday(new Date().getUTCMonth(), new Date().getUTCFullYear());
        //Active Mega Crab
        if (Date.now() > thisMonthMegaCrabSunday.getTime() - 172800000 && Date.now() < thisMonthMegaCrabSunday.getTime() + 86400000) {
            date = new Date(thisMonthMegaCrabSunday.getTime() + 86400000);
            active = true;
            activeMegaCrab = true;
        }
        else {
            if (Date.now() < thisMonthMegaCrabSunday.getTime() - 172800000) {
                date = new Date(thisMonthMegaCrabSunday.getTime() - 172800000);
            }
            else {
                date = getLastSunday(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 11 ? 1 : 0));
            }
            ;
        }
        ;
        megaCrabBegin = Date.now() < thisMonthMegaCrabSunday.getTime() - 172800000 ? new Date(thisMonthMegaCrabSunday.getTime() - 172800000) : getLastSunday(date.getUTCMonth() == 11 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 11 ? 1 : 0));
        megaCrabEnd = new Date(thisMonthMegaCrabSunday.getTime() + 86400000);
        date.setUTCHours(8);
    }
    else if (element == "intelReset") {
        active = true;
        date = getNextSunday();
    }
    else if (element == "forcePointsDecrease") {
        active = true;
        let todayMidnight = new Date();
        todayMidnight.setUTCMilliseconds(0);
        todayMidnight.setUTCSeconds(0);
        todayMidnight.setUTCMinutes(0);
        todayMidnight.setUTCHours(0);
        todayMidnight = new Date(todayMidnight.getTime() + 86400000);
        date = todayMidnight;
    }
    ;
    createCountdown(document.getElementById(element), date, active);
}
;
function getLastDay(month, year) {
    new Date(year ? year : new Date().getUTCFullYear(), month + 1, 0).getDate();
}
;
function getLastMonday(month, year) {
    const date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    //Clash of Clans UTC League Reset Hours
    date.setUTCHours(5);
    date.setUTCFullYear(year);
    if (month == 11)
        date.setUTCFullYear(date.getUTCFullYear() + 1);
    date.setUTCDate(1); // Roll to the first day of ...
    date.setUTCMonth(month == 11 ? 0 : month + 1); // ... the next month.
    date.setUTCFullYear(year);
    do { // Roll the days backwards until Monday.
        date.setUTCDate(date.getUTCDate() - 1);
    } while (date.getUTCDay() !== 1);
    return date;
}
;
function getLastSunday(month, year) {
    const date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    //Boom Beach Mega Crab End
    date.setUTCHours(8);
    date.setUTCFullYear(year);
    if (month == 11)
        date.setUTCFullYear(date.getUTCFullYear() + 1);
    date.setUTCDate(1); // Roll to the first day of ...
    date.setUTCMonth(month == 11 ? 0 : month + 1); // ... the next month.
    do { // Roll the days backwards until Sunday.
        date.setUTCDate(date.getUTCDate() - 1);
    } while (date.getUTCDay() != 0);
    return date;
}
;
function getNextSunday() {
    let date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setUTCHours(0);
    while (date.getDay() != 0 || date.getTime() < Date.now()) {
        date = new Date(date.getTime() + 86400000);
    }
    ;
    return date;
}
;
//# sourceMappingURL=home.js.map