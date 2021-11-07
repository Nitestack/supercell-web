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
        };
    };
});

let megaCrabEnd: Date;
let megaCrabBegin: Date;
for (const element of ["cwl", "clanGames", "cocLeagueReset", "cocSeasonEnd", "bsLeagueReset", "bsSeasonEnd", "powerLeague", "crLeagueReset", "crSeasonEnd", "megaCrab", "tribeBoost", "bbSeasonEnd", "intelReset", "forcePointsDecrease"]) {
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
        } else {
            if (date.getUTCMonth() == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
            date.setUTCMonth(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1);
            date.setUTCDate(1);
        };
        date.setUTCHours(8);
    } else if (element == "cocSeasonEnd") {
        active = true;
        if (date.getUTCMonth() == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
        date.setUTCMonth(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1);
        date.setUTCDate(1);
        date.setUTCHours(8);
    } else if (element == "cocLeagueReset") {
        active = true;
        const thisMonthLastMonday = getLastMonday(date.getUTCMonth(), date.getUTCFullYear());
        if (Date.now() > thisMonthLastMonday.getTime()) {
            date.setUTCDate(getLastMonday(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 12 ? 1 : 0)).getUTCDate());
            date.setUTCMonth(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1);
            if (date.getUTCMonth() == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
        } else date.setUTCDate(thisMonthLastMonday.getUTCDate());
        date.setUTCHours(5);
    } else if (element == "clanGames") {
        const activeDays = [23, 24, 25, 26, 27];
        //Active Clan Games
        if (activeDays.includes(date.getUTCDate()) || (date.getUTCDate() == 22 && date.getUTCDate() > 8 || (date.getUTCDate() == 28 && date.getUTCHours() < 8))) {
            active = true;
            date.setUTCDate(28);
        } else {
            if (date.getUTCDate() >= 28) {
                if (date.getUTCMonth() == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
                date.setUTCMonth(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1);
            };
            date.setUTCDate(22);
        };
        date.setUTCHours(8);
    }
    //Brawl Stars
    else if (element == "bsLeagueReset") {
        active = true;
        let nextLeagueReset = new Date();
        nextLeagueReset.setUTCFullYear(2021);
        nextLeagueReset.setMonth(7);
        nextLeagueReset.setUTCDate(23);
        nextLeagueReset.setUTCHours(8);
        nextLeagueReset.setUTCMinutes(0);
        nextLeagueReset.setUTCSeconds(0);
        nextLeagueReset.setUTCMilliseconds(0);
        while (Date.now() > nextLeagueReset.getTime()) {
            nextLeagueReset = new Date(nextLeagueReset.getTime() + 2419200000);
        };
        date.setUTCHours(8);
        date = nextLeagueReset;
    } else if (element == "bsSeasonEnd") {
        active = true;
        let nextSeasonEnd = new Date();
        nextSeasonEnd.setUTCFullYear(2021);
        nextSeasonEnd.setMonth(7);
        nextSeasonEnd.setUTCDate(30);
        nextSeasonEnd.setUTCHours(9);
        nextSeasonEnd.setUTCMinutes(0);
        nextSeasonEnd.setUTCSeconds(0);
        nextSeasonEnd.setUTCMilliseconds(0);
        while (Date.now() > nextSeasonEnd.getTime()) {
            nextSeasonEnd = new Date(nextSeasonEnd.getTime() + 6048000000);
        };
        date.setUTCHours(9);
        date = nextSeasonEnd;
    } else if (element == "powerLeague") {
        let nextPowerLeagueEnd = new Date();
        nextPowerLeagueEnd.setUTCFullYear(2021);
        nextPowerLeagueEnd.setMonth(7);
        nextPowerLeagueEnd.setUTCDate(30);
        nextPowerLeagueEnd.setUTCHours(9);
        nextPowerLeagueEnd.setUTCMinutes(0);
        nextPowerLeagueEnd.setUTCSeconds(0);
        nextPowerLeagueEnd.setUTCMilliseconds(0);
        while (Date.now() > nextPowerLeagueEnd.getTime()) {
            nextPowerLeagueEnd = new Date(nextPowerLeagueEnd.getTime() + 6048000000);
        };
        date.setUTCHours(9);
        date = nextPowerLeagueEnd;
        //Active Power League
        if (nextPowerLeagueEnd.getTime() - Date.now() > 345600000) {
            active = true;
            date = new Date(date.getTime() - 345600000);
        };
    }
    //Clash Royale
    else if (element == "crLeagueReset" || element == "crSeasonEnd") {
        active = true;
        date = getClashRoyaleSeasonEnd();
    }
    //Boom Beach
    else if (element == "tribeBoost") {
        active = true;
        let nextTribeBoostReset = new Date();
        nextTribeBoostReset.setUTCFullYear(2021);
        nextTribeBoostReset.setMonth(7);
        nextTribeBoostReset.setUTCDate(16);
        nextTribeBoostReset.setUTCHours(0);
        nextTribeBoostReset.setUTCMinutes(0);
        nextTribeBoostReset.setUTCSeconds(0);
        nextTribeBoostReset.setUTCMilliseconds(0);
        while (Date.now() > nextTribeBoostReset.getTime()) {
            nextTribeBoostReset = new Date(nextTribeBoostReset.getTime() + 1209600000);
        };
        date = nextTribeBoostReset;
        date.setUTCHours(0);
        if (nextTribeBoostReset.getTime() > megaCrabBegin.getTime() && megaCrabEnd.getTime() > nextTribeBoostReset.getTime()) date = megaCrabEnd;
    } else if (element == "bbSeasonEnd") {
        //Active Warship Season
        if (megaCrabEnd.getTime() < Date.now() || megaCrabEnd.getTime() - 604800000 > Date.now()) {
            active = true;
            date = new Date(megaCrabEnd.getTime() - 604800000);
        } else {
            date = megaCrabEnd;
        };
        date.setUTCHours(8);
    } else if (element == "megaCrab") {
        const thisMonthMegaCrabSunday = getLastSunday(new Date().getUTCMonth(), new Date().getUTCFullYear());
        //Active Mega Crab
        if (Date.now() > thisMonthMegaCrabSunday.getTime() - 172800000 && Date.now() < thisMonthMegaCrabSunday.getTime() + 86400000) {
            date = new Date(thisMonthMegaCrabSunday.getTime() + 86400000);
            active = true;
            activeMegaCrab = true;
        } else {
            if (Date.now() < thisMonthMegaCrabSunday.getTime() - 172800000) {
                date = new Date(thisMonthMegaCrabSunday.getTime() - 172800000);
            } else {
                date = getLastSunday(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 12 ? 1 : 0));
            };
        };
        megaCrabBegin = Date.now() < thisMonthMegaCrabSunday.getTime() - 172800000 ? new Date(thisMonthMegaCrabSunday.getTime() - 172800000) : getLastSunday(date.getUTCMonth() == 12 ? 0 : date.getUTCMonth() + 1, date.getUTCFullYear() + (date.getUTCMonth() == 12 ? 1 : 0));
        megaCrabEnd = new Date(thisMonthMegaCrabSunday.getTime() + 86400000);
        date.setUTCHours(8);
    } else if (element == "intelReset") {
        active = true;
        date = getNextSunday();
    } else if (element == "forcePointsDecrease") {
        active = true;
        let todayMidnight = new Date();
        todayMidnight.setUTCMilliseconds(0);
        todayMidnight.setUTCSeconds(0);
        todayMidnight.setUTCMinutes(0);
        todayMidnight.setUTCHours(0);
        todayMidnight = new Date(todayMidnight.getTime() + 86400000);
        date = todayMidnight;
    };
    createCountdown(document.getElementById(element), date, active);
};

function getLastDay(month: number, year?: number) {
    new Date(year ? year : new Date().getUTCFullYear(), month + 1, 0).getDate();
};

function getLastMonday(month: number, year: number) {
    const date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    //Clash of Clans UTC League Reset Hours
    date.setUTCHours(5);
    if (month == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
    date.setUTCDate(1); // Roll to the first day of ...
    date.setUTCMonth(month == 12 ? 0 : month + 1); // ... the next month.
    do { // Roll the days backwards until Monday.
        date.setUTCDate(date.getUTCDate() - 1);
    } while (date.getUTCDay() !== 1);
    return date;
};

function getLastSunday(month: number, year: number) {
    const date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    //Boom Beach Mega Crab End
    date.setUTCHours(8);
    if (month == 12) date.setUTCFullYear(date.getUTCFullYear() + 1);
    date.setUTCDate(1); // Roll to the first day of ...
    date.setUTCMonth(month == 12 ? 0 : month + 1); // ... the next month.
    do { // Roll the days backwards until Monday.
        date.setUTCDate(date.getUTCDate() - 1);
    } while (date.getUTCDay() != 0);
    return date;
};

function getNextSunday() {
    let date = new Date();
    date.setUTCMilliseconds(0);
    date.setUTCSeconds(0);
    date.setUTCMinutes(0);
    date.setUTCHours(0);
    while(date.getDay() != 0 || date.getTime() < Date.now()) {
        date = new Date(date.getTime() + 86400000);
    };
    return date;
};