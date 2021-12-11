import HomeDefense from "./Home/HomeDefense";
import HomeArmy from "./Home/HomeArmy";
import HomeTrap from "./Home/HomeTrap";
import HomeResource from "./Home/HomeResource";
import HomeHero from "./Home/HomeHero";
import HomePet from "./Home/HomePet";
import Base from "./Base";
import HomeOffense from "./Home/HomeOffense";

//---------DEFENSE-----------\\
export const home: Array<Base> = [new HomeDefense({
    name: "Wall",
    levels: [{
        costs: 50,
        upgradeDuration: "0s"
    }, {
        costs: 1000,
        upgradeDuration: "0s"
    }, {
        costs: 5000,
        upgradeDuration: "0s"
    }, {
        costs: 10000,
        upgradeDuration: "0s"
    }, {
        costs: 20000,
        upgradeDuration: "0s"
    }, {
        costs: 30000,
        upgradeDuration: "0s"
    }, {
        costs: 50000,
        upgradeDuration: "0s"
    }, {
        costs: 75000,
        upgradeDuration: "0s"
    }, {
        costs: 100000,
        upgradeDuration: "0s"
    }, {
        costs: 200000,
        upgradeDuration: "0s"
    }, {
        costs: 500000,
        upgradeDuration: "0s"
    }, {
        costs: 1000000,
        upgradeDuration: "0s"
    }, {
        costs: 3000000,
        upgradeDuration: "0s"
    }, {
        costs: 5000000,
        upgradeDuration: "0s"
    }, {
        costs: 7000000,
        upgradeDuration: "0s"
    }]
}), new HomeDefense({
    name: "Cannon",
    levels: [{
        costs: 250,
        upgradeDuration: "10s"
    }, {
        costs: 1000,
        upgradeDuration: "2m"
    }, {
        costs: 4000,
        upgradeDuration: "10m"
    }, {
        costs: 16000,
        upgradeDuration: "45m"
    }, {
        costs: 50000,
        upgradeDuration: "2h"
    }, {
        costs: 100000,
        upgradeDuration: "4h"
    }, {
        costs: 200000,
        upgradeDuration: "8h"
    }, {
        costs: 300000,
        upgradeDuration: "10h"
    }, {
        costs: 500000,
        upgradeDuration: "12h"
    }, {
        costs: 700000,
        upgradeDuration: "18h"
    }, {
        costs: 1000000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2000000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 3000000,
        upgradeDuration: "4d 12h"
    }, {
        costs: 4500000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "9d"
    }, {
        costs: 9000000,
        upgradeDuration: "12d"
    }, {
        costs: 11000000,
        upgradeDuration: "15d"
    }, {
        costs: 13000000,
        upgradeDuration: "16d"
    }, {
        costs: 17500000,
        upgradeDuration: "17d"
    }]
}), new HomeDefense({
    name: "Archer Tower",
    levels: [{
        costs: 1000,
        upgradeDuration: "1m"
    }, {
        costs: 2000,
        upgradeDuration: "15m"
    }, {
        costs: 5000,
        upgradeDuration: "45m"
    }, {
        costs: 20000,
        upgradeDuration: "3h"
    }, {
        costs: 80000,
        upgradeDuration: "5h"
    }, {
        costs: 180000,
        upgradeDuration: "8h"
    }, {
        costs: 360000,
        upgradeDuration: "10h"
    }, {
        costs: 600000,
        upgradeDuration: "12h"
    }, {
        costs: 800000,
        upgradeDuration: "14h"
    }, {
        costs: 1000000,
        upgradeDuration: "18h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 1800000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2400000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 3600000,
        upgradeDuration: "5d"
    }, {
        costs: 5000000,
        upgradeDuration: "7d"
    }, {
        costs: 7500000,
        upgradeDuration: "9d"
    }, {
        costs: 9500000,
        upgradeDuration: "12d"
    }, {
        costs: 11500000,
        upgradeDuration: "15d"
    }, {
        costs: 13000000,
        upgradeDuration: "16d"
    }, {
        costs: 17500000,
        upgradeDuration: "17d"
    }]
}), new HomeDefense({
    name: "Clan Castle",
    levels: [{
        costs: 10000,
        upgradeDuration: "0s"
    }, {
        costs: 100000,
        upgradeDuration: "8h"
    }, {
        costs: 800000,
        upgradeDuration: "12h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 2500000,
        upgradeDuration: "2d"
    }, {
        costs: 5000000,
        upgradeDuration: "6d"
    }, {
        costs: 8000000,
        upgradeDuration: "9d"
    }, {
        costs: 12000000,
        upgradeDuration: "14d"
    }, {
        costs: 16000000,
        upgradeDuration: "18d"
    }, {
        costs: 19000000,
        upgradeDuration: "20d"
    }]
}), new HomeDefense({
    name: "Mortar",
    levels: [{
        costs: 5000,
        upgradeDuration: "3h"
    }, {
        costs: 25000,
        upgradeDuration: "6h"
    }, {
        costs: 100000,
        upgradeDuration: "12h"
    }, {
        costs: 200000,
        upgradeDuration: "1d"
    }, {
        costs: 400000,
        upgradeDuration: "2d"
    }, {
        costs: 750000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 1500000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 5000000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "8d"
    }, {
        costs: 9000000,
        upgradeDuration: "12d"
    }, {
        costs: 10500000,
        upgradeDuration: "14d"
    }, {
        costs: 13000000,
        upgradeDuration: "16d"
    }, {
        costs: 17500000,
        upgradeDuration: "18d"
    }]
}), new HomeDefense({
    name: "Air Defense",
    levels: [{
        costs: 22000,
        upgradeDuration: "3h"
    }, {
        costs: 90000,
        upgradeDuration: "12h"
    }, {
        costs: 270000,
        upgradeDuration: "16h"
    }, {
        costs: 500000,
        upgradeDuration: "1d"
    }, {
        costs: 1000000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1350000,
        upgradeDuration: "2d"
    }, {
        costs: 1750000,
        upgradeDuration: "3d"
    }, {
        costs: 3500000,
        upgradeDuration: "5d"
    }, {
        costs: 6000000,
        upgradeDuration: "9d"
    }, {
        costs: 9500000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }, {
        costs: 18000000,
        upgradeDuration: "18d"
    }]
}), new HomeDefense({
    name: "Wizard Tower",
    levels: [{
        costs: 120000,
        upgradeDuration: "3h"
    }, {
        costs: 220000,
        upgradeDuration: "8h"
    }, {
        costs: 420000,
        upgradeDuration: "12h"
    }, {
        costs: 720000,
        upgradeDuration: "18h"
    }, {
        costs: 920000,
        upgradeDuration: "1d"
    }, {
        costs: 1200000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2200000,
        upgradeDuration: "2d"
    }, {
        costs: 3200000,
        upgradeDuration: "3d 12h"
    }, {
        costs: 4200000,
        upgradeDuration: "6d"
    }, {
        costs: 7200000,
        upgradeDuration: "9d"
    }, {
        costs: 10200000,
        upgradeDuration: "14d"
    }, {
        costs: 14200000,
        upgradeDuration: "16d"
    }, {
        costs: 16200000,
        upgradeDuration: "17d"
    }, {
        costs: 18200000,
        upgradeDuration: "18d"
    }]
}), new HomeDefense({
    name: "Air Sweeper",
    levels: [{
        costs: 400000,
        upgradeDuration: "6h"
    }, {
        costs: 700000,
        upgradeDuration: "12h"
    }, {
        costs: 1100000,
        upgradeDuration: "18h"
    }, {
        costs: 1500000,
        upgradeDuration: "1d"
    }, {
        costs: 2000000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "3d"
    }, {
        costs: 6000000,
        upgradeDuration: "5d"
    }]
}), new HomeDefense({
    name: "Hidden Tesla",
    levels: [{
        costs: 300000,
        upgradeDuration: "2h"
    }, {
        costs: 450000,
        upgradeDuration: "5h"
    }, {
        costs: 650000,
        upgradeDuration: "10h"
    }, {
        costs: 850000,
        upgradeDuration: "18h"
    }, {
        costs: 1100000,
        upgradeDuration: "1d"
    }, {
        costs: 1300000,
        upgradeDuration: "2d"
    }, {
        costs: 1800000,
        upgradeDuration: "3d"
    }, {
        costs: 2500000,
        upgradeDuration: "5d"
    }, {
        costs: 4500000,
        upgradeDuration: "8d"
    }, {
        costs: 8000000,
        upgradeDuration: "14d"
    }, {
        costs: 13000000,
        upgradeDuration: "16d"
    }, {
        costs: 15000000,
        upgradeDuration: "17d"
    }, {
        costs: 18000000,
        upgradeDuration: "18d"
    }]
}), new HomeDefense({
    name: "Bomb Tower",
    levels: [{
        costs: 800000,
        upgradeDuration: "1d"
    }, {
        costs: 1200000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1800000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 5000000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "9d"
    }, {
        costs: 10000000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16"
    }, {
        costs: 18500000,
        upgradeDuration: "18d"
    }]
}), new HomeDefense({
    name: "X-Bow",
    levels: [{
        costs: 1000000,
        upgradeDuration: "2d"
    }, {
        costs: 1600000,
        upgradeDuration: "4d"
    }, {
        costs: 2400000,
        upgradeDuration: "5d"
    }, {
        costs: 4000000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "9d"
    }, {
        costs: 10500000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }, {
        costs: 17000000,
        upgradeDuration: "17d"
    }, {
        costs: 18500000,
        upgradeDuration: "19d"
    }]
}), new HomeDefense({
    name: "Inferno Tower",
    levels: [{
        costs: 2000000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 4500000,
        upgradeDuration: "5d"
    }, {
        costs: 6000000,
        upgradeDuration: "7d"
    }, {
        costs: 7500000,
        upgradeDuration: "9d"
    }, {
        costs: 10500000,
        upgradeDuration: "14d"
    }, {
        costs: 16000000,
        upgradeDuration: "17d"
    }, {
        costs: 19000000,
        upgradeDuration: "19d"
    }]
}), new HomeDefense({
    name: "Eagle Artillery",
    levels: [{
        costs: 8000000,
        upgradeDuration: "7d"
    }, {
        costs: 10000000,
        upgradeDuration: "10d"
    }, {
        costs: 12000000,
        upgradeDuration: "14d"
    }, {
        costs: 18000000,
        upgradeDuration: "18d"
    }, {
        costs: 20000000,
        upgradeDuration: "20d"
    }]
}), new HomeDefense({
    name: "Scattershot",
    levels: [{
        costs: 15000000,
        upgradeDuration: "15d"
    }, {
        costs: 17000000,
        upgradeDuration: "17d"
    }, {
        costs: 19000000,
        upgradeDuration: "19d"
    }]
}), new HomeDefense({
    name: "Builder's Hut",
    levels: [{
        costs: 0,
        upgradeDuration: "0s"
    }, {
        costs: 9500000,
        upgradeDuration: "10d"
    }, {
        costs: 12500000,
        upgradeDuration: "12d"
    }, {
        costs: 15500000,
        upgradeDuration: "14d"
    }]
}), new HomeDefense({
    name: "Giga Tesla",
    levels: [{
        costs: 0,
        upgradeDuration: "0s"
    }, {
        costs: 4000000,
        upgradeDuration: "2d"
    }, {
        costs: 6000000,
        upgradeDuration: "4d"
    }, {
        costs: 8000000,
        upgradeDuration: "6d"
    }, {
        costs: 10000000,
        upgradeDuration: "8d"
    }]
}), new HomeDefense({
    name: "Giga Inferno 1",
    levels: [{
        costs: 0,
        upgradeDuration: "0s"
    }, {
        costs: 10000000,
        upgradeDuration: "6d"
    }, {
        costs: 12000000,
        upgradeDuration: "8d"
    }, {
        costs: 15000000,
        upgradeDuration: "9d"
    }, {
        costs: 18000000,
        upgradeDuration: "11d"
    }]
}), new HomeDefense({
    name: "Giga Inferno 2",
    levels: [{
        costs: 0,
        upgradeDuration: "0s"
    }, {
        costs: 9000000,
        upgradeDuration: "9d"
    }, {
        costs: 11000000,
        upgradeDuration: "11d"
    }, {
        costs: 13000000,
        upgradeDuration: "13d"
    }, {
        costs: 15000000,
        upgradeDuration: "14d"
    }]
//-----------ARMY------------\\
}), new HomeArmy({
    name: "Army Camp",
    levels: [{
        costs: 200,
        upgradeDuration: "5m"
    }, {
        costs: 2000,
        upgradeDuration: "15m"
    }, {
        costs: 10000,
        upgradeDuration: "2h"
    }, {
        costs: 100000,
        upgradeDuration: "5h"
    }, {
        costs: 250000,
        upgradeDuration: "8h"
    }, {
        costs: 750000,
        upgradeDuration: "12h"
    }, {
        costs: 1500000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "3d 12h"
    }, {
        costs: 6000000,
        upgradeDuration: "9d"
    }, {
        costs: 9000000,
        upgradeDuration: "14d"
    }, {
        costs: 16000000,
        upgradeDuration: "16d"
    }]
}), new HomeArmy({
    name: "Barracks",
    levels: [{
        costs: 100,
        upgradeDuration: "10s"
    }, {
        costs: 500,
        upgradeDuration: "1m"
    }, {
        costs: 2500,
        upgradeDuration: "10m"
    }, {
        costs: 5000,
        upgradeDuration: "1h"
    }, {
        costs: 10000,
        upgradeDuration: "4h"
    }, {
        costs: 75000,
        upgradeDuration: "8h"
    }, {
        costs: 200000,
        upgradeDuration: "12h"
    }, {
        costs: 600000,
        upgradeDuration: "16h"
    }, {
        costs: 900000,
        upgradeDuration: "1d"
    }, {
        costs: 1200000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1800000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 2500000,
        upgradeDuration: "4d"
    }, {
        costs: 4000000,
        upgradeDuration: "6d"
    }, {
        costs: 5000000,
        upgradeDuration: "9d"
    }, {
        costs: 6000000,
        upgradeDuration: "11d"
    }]
}), new HomeArmy({
    name: "Laboratory",
    levels: [{
        costs: 5000,
        upgradeDuration: "1m"
    }, {
        costs: 25000,
        upgradeDuration: "1h"
    }, {
        costs: 50000,
        upgradeDuration: "2h"
    }, {
        costs: 100000,
        upgradeDuration: "4h"
    }, {
        costs: 200000,
        upgradeDuration: "8h"
    }, {
        costs: 400000,
        upgradeDuration: "16h"
    }, {
        costs: 800000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 6000000,
        upgradeDuration: "6d"
    }, {
        costs: 9000000,
        upgradeDuration: "9d"
    }, {
        costs: 12000000,
        upgradeDuration: "12d"
    }]
}), new HomeArmy({
    name: "Spell Factory",
    levels: [{
        costs: 150000,
        upgradeDuration: "8h"
    }, {
        costs: 300000,
        upgradeDuration: "1d"
    }, {
        costs: 600000,
        upgradeDuration: "2d"
    }, {
        costs: 1200000,
        upgradeDuration: "3d 12h"
    }, {
        costs: 2400000,
        upgradeDuration: "5d"
    }, {
        costs: 4800000,
        upgradeDuration: "7d"
    }]
}), new HomeArmy({
    name: "Dark Barracks",
    levels: [{
        costs: 100000,
        upgradeDuration: "4h"
    }, {
        costs: 300000,
        upgradeDuration: "12h"
    }, {
        costs: 500000,
        upgradeDuration: "18h"
    }, {
        costs: 900000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "2d"
    }, {
        costs: 2200000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "5d"
    }, {
        costs: 4000000,
        upgradeDuration: "9d"
    }, {
        costs: 7500000,
        upgradeDuration: "13d"
    }]
}), new HomeArmy({
    name: "Dark Spell Factory",
    levels: [{
        costs: 150000,
        upgradeDuration: "6h"
    }, {
        costs: 300000,
        upgradeDuration: "18h"
    }, {
        costs: 600000,
        upgradeDuration: "2d"
    }, {
        costs: 1200000,
        upgradeDuration: "4d"
    }, {
        costs: 2500000,
        upgradeDuration: "6d"
    }]
}), new HomeArmy({
    name: "Workshop",
    levels: [{
        costs: 5000000,
        upgradeDuration: "6d"
    }, {
        costs: 8000000,
        upgradeDuration: "8d"
    }, {
        costs: 10500000,
        upgradeDuration: "10d"
    }, {
        costs: 14500000,
        upgradeDuration: "14d"
    }, {
        costs: 16000000,
        upgradeDuration: "16d"
    }, {
        costs: 17500000,
        upgradeDuration: "18d"
    }]
}), new HomeArmy({
    name: "Pet House",
    levels: [{
        costs: 15000000,
        upgradeDuration: "13d"
    }, {
        costs: 17500000,
        upgradeDuration: "15d"
    }, {
        costs: 18500000,
        upgradeDuration: "17d"
    }, {
        costs: 19500000,
        upgradeDuration: "19d"
    }]
//-----------TRAP------------\\
}), new HomeTrap({
    name: "Bomb",
    levels: [{
        costs: 400,
        upgradeDuration: "0s"
    }, {
        costs: 1000,
        upgradeDuration: "6m"
    }, {
        costs: 10000,
        upgradeDuration: "2h"
    }, {
        costs: 100000,
        upgradeDuration: "8h"
    }, {
        costs: 300000,
        upgradeDuration: "18h"
    }, {
        costs: 500000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1000000,
        upgradeDuration: "3d"
    }, {
        costs: 2000000,
        upgradeDuration: "4d"
    }, {
        costs: 4000000,
        upgradeDuration: "6d"
    }, {
        costs: 6000000,
        upgradeDuration: "8d"
    }]
}), new HomeTrap({
    name: "Spring Trap",
    levels: [{
        costs: 2000,
        upgradeDuration: "0s"
    }, {
        costs: 300000,
        upgradeDuration: "12h"
    }, {
        costs: 500000,
        upgradeDuration: "18h"
    }, {
        costs: 800000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1200000,
        upgradeDuration: "3d"
    }]
}), new HomeTrap({
    name: "Air Bomb",
    levels: [{
        costs: 4000,
        upgradeDuration: "0s"
    }, {
        costs: 20000,
        upgradeDuration: "4h"
    }, {
        costs: 200000,
        upgradeDuration: "12h"
    }, {
        costs: 600000,
        upgradeDuration: "1d"
    }, {
        costs: 2000000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "3d"
    }, {
        costs: 4000000,
        upgradeDuration: "6d"
    }, {
        costs: 5000000,
        upgradeDuration: "7d"
    }, {
        costs: 7000000,
        upgradeDuration: "9d"
    }]
}), new HomeTrap({
    name: "Giant Bomb",
    levels: [{
        costs: 12500,
        upgradeDuration: "0s"
    }, {
        costs: 75000,
        upgradeDuration: "6h"
    }, {
        costs: 600000,
        upgradeDuration: "1d"
    }, {
        costs: 2400000,
        upgradeDuration: "3d"
    }, {
        costs: 3500000,
        upgradeDuration: "5d"
    }, {
        costs: 5000000,
        upgradeDuration: "7d"
    }, {
        costs: 7000000,
        upgradeDuration: "9d"
    }, {
        costs: 9000000,
        upgradeDuration: "11d"
    }]
}), new HomeTrap({
    name: "Seeking Air Mine",
    levels: [{
        costs: 15000,
        upgradeDuration: "0s"
    }, {
        costs: 1000000,
        upgradeDuration: "1d"
    }, {
        costs: 2500000,
        upgradeDuration: "3d"
    }, {
        costs: 6000000,
        upgradeDuration: "7d"
    }]
}), new HomeTrap({
    name: "Skeleton Trap",
    levels: [{
        costs: 6000,
        upgradeDuration: "0s"
    }, {
        costs: 450000,
        upgradeDuration: "5h"
    }, {
        costs: 900000,
        upgradeDuration: "20h"
    }, {
        costs: 1500000,
        upgradeDuration: "1d 16h"
    }]
}), new HomeTrap({
    name: "Tornado Trap",
    levels: [{
        costs: 2500000,
        upgradeDuration: "0s"
    }, {
        costs: 4000000,
        upgradeDuration: "2d"
    }, {
        costs: 5000000,
        upgradeDuration: "3d"
    }]
//---------RESOURCE----------\\
}), new HomeResource({
    name: "Elixir Storage",
    levels: [{
        costs: 300,
        upgradeDuration: "10s"
    }, {
        costs: 750,
        upgradeDuration: "5m"
    }, {
        costs: 1500,
        upgradeDuration: "20m"
    }, {
        costs: 3000,
        upgradeDuration: "1h"
    }, {
        costs: 6000,
        upgradeDuration: "2h"
    }, {
        costs: 12000,
        upgradeDuration: "3h"
    }, {
        costs: 25000,
        upgradeDuration: "4h"
    }, {
        costs: 50000,
        upgradeDuration: "5h"
    }, {
        costs: 100000,
        upgradeDuration: "8h"
    }, {
        costs: 250000,
        upgradeDuration: "12h"
    }, {
        costs: 500000,
        upgradeDuration: "16h"
    }, {
        costs: 1500000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "6d"
    }, {
        costs: 4500000,
        upgradeDuration: "9d"
    }, {
        costs: 6000000,
        upgradeDuration: "12d"
    }]
}), new HomeResource({
    name: "Elixir Collector",
    levels: [{
        costs: 150,
        upgradeDuration: "10s"
    }, {
        costs: 300,
        upgradeDuration: "1m"
    }, {
        costs: 700,
        upgradeDuration: "4m"
    }, {
        costs: 1400,
        upgradeDuration: "10m"
    }, {
        costs: 3000,
        upgradeDuration: "40m"
    }, {
        costs: 7000,
        upgradeDuration: "3h"
    }, {
        costs: 14000,
        upgradeDuration: "6h"
    }, {
        costs: 28000,
        upgradeDuration: "8h"
    }, {
        costs: 56000,
        upgradeDuration: "10h"
    }, {
        costs: 75000,
        upgradeDuration: "12h"
    }, {
        costs: 100000,
        upgradeDuration: "16h"
    }, {
        costs: 200000,
        upgradeDuration: "20h"
    }, {
        costs: 400000,
        upgradeDuration: "1d 16h"
    }, {
        costs: 800000,
        upgradeDuration: "3d 8h"
    }, {
        costs: 1200000,
        upgradeDuration: "6d"
    }]
}), new HomeResource({
    name: "Gold Storage",
    levels: [{
        costs: 300,
        upgradeDuration: "10s"
    }, {
        costs: 700,
        upgradeDuration: "5m"
    }, {
        costs: 1500,
        upgradeDuration: "20m"
    }, {
        costs: 3000,
        upgradeDuration: "1h"
    }, {
        costs: 6000,
        upgradeDuration: "2h"
    }, {
        costs: 12000,
        upgradeDuration: "3h"
    }, {
        costs: 25000,
        upgradeDuration: "4h"
    }, {
        costs: 50000,
        upgradeDuration: "5h"
    }, {
        costs: 100000,
        upgradeDuration: "8h"
    }, {
        costs: 250000,
        upgradeDuration: "12h"
    }, {
        costs: 500000,
        upgradeDuration: "16h"
    }, {
        costs: 1500000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "6d"
    }, {
        costs: 4500000,
        upgradeDuration: "9d"
    }, {
        costs: 6000000,
        upgradeDuration: "12d"
    }]
}), new HomeResource({
    name: "Gold Mine",
    levels: [{
        costs: 150,
        upgradeDuration: "10s"
    }, {
        costs: 300,
        upgradeDuration: "1m"
    }, {
        costs: 700,
        upgradeDuration: "4m"
    }, {
        costs: 1400,
        upgradeDuration: "10m"
    }, {
        costs: 3000,
        upgradeDuration: "40m"
    }, {
        costs: 7000,
        upgradeDuration: "3h"
    }, {
        costs: 14000,
        upgradeDuration: "6h"
    }, {
        costs: 28000,
        upgradeDuration: "8h"
    }, {
        costs: 56000,
        upgradeDuration: "10h"
    }, {
        costs: 75000,
        upgradeDuration: "12h"
    }, {
        costs: 100000,
        upgradeDuration: "16h"
    }, {
        costs: 200000,
        upgradeDuration: "20h"
    }, {
        costs: 400000,
        upgradeDuration: "1d 16h"
    }, {
        costs: 800000,
        upgradeDuration: "3d 8h"
    }, {
        costs: 1200000,
        upgradeDuration: "6d"
    }]
}), new HomeResource({
    name: "Dark Elixir Storage",
    levels: [{
        costs: 250000,
        upgradeDuration: "8h"
    }, {
        costs: 500000,
        upgradeDuration: "16h"
    }, {
        costs: 1000000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2000000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "3d"
    }, {
        costs: 6000000,
        upgradeDuration: "5d"
    }, {
        costs: 9000000,
        upgradeDuration: "10d"
    }, {
        costs: 12000000,
        upgradeDuration: "15d"
    }]
}), new HomeResource({
    name: "Dark Elixir Drill",
    levels: [{
        costs: 500000,
        upgradeDuration: "6h"
    }, {
        costs: 700000,
        upgradeDuration: "12h"
    }, {
        costs: 900000,
        upgradeDuration: "18h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1800000,
        upgradeDuration: "2d"
    }, {
        costs: 2400000,
        upgradeDuration: "3d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 4000000,
        upgradeDuration: "7d"
    }]
//-----------HERO------------\\
}), new HomeHero({
    name: "Barbarian King",
    levels: [{
        costs: 5000,
        upgradeDuration: "0s"
    }, {
        costs: 6000,
        upgradeDuration: "4h"
    }, {
        costs: 7000,
        upgradeDuration: "6h"
    }, {
        costs: 8000,
        upgradeDuration: "8h"
    }, {
        costs: 10000,
        upgradeDuration: "10h"
    }, {
        costs: 11000,
        upgradeDuration: "12h"
    }, {
        costs: 12000,
        upgradeDuration: "14h"
    }, {
        costs: 13000,
        upgradeDuration: "16h"
    }, {
        costs: 14000,
        upgradeDuration: "18h"
    }, {
        costs: 15000,
        upgradeDuration: "20h"
    }, {
        costs: 17000,
        upgradeDuration: "22h"
    }, {
        costs: 19000,
        upgradeDuration: "1d"
    }, {
        costs: 21000,
        upgradeDuration: "1d 8h"
    }, {
        costs: 23000,
        upgradeDuration: "1d 16h"
    }, {
        costs: 25000,
        upgradeDuration: "2d"
    }, {
        costs: 27000,
        upgradeDuration: "2d"
    }, {
        costs: 29000,
        upgradeDuration: "2d"
    }, {
        costs: 31000,
        upgradeDuration: "2d"
    }, {
        costs: 33000,
        upgradeDuration: "2d"
    }, {
        costs: 35000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 37000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 39000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 41000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 43000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 45000,
        upgradeDuration: "3d"
    }, {
        costs: 47000,
        upgradeDuration: "3d"
    }, {
        costs: 49000,
        upgradeDuration: "3d"
    }, {
        costs: 51000,
        upgradeDuration: "3d"
    }, {
        costs: 53000,
        upgradeDuration: "3d"
    }, {
        costs: 55000,
        upgradeDuration: "4d"
    }, {
        costs: 57000,
        upgradeDuration: "4d"
    }, {
        costs: 59000,
        upgradeDuration: "4d"
    }, {
        costs: 61000,
        upgradeDuration: "4d"
    }, {
        costs: 63000,
        upgradeDuration: "4d"
    }, {
        costs: 65000,
        upgradeDuration: "5d"
    }, {
        costs: 68000,
        upgradeDuration: "5d"
    }, {
        costs: 71000,
        upgradeDuration: "5d"
    }, {
        costs: 74000,
        upgradeDuration: "5d"
    }, {
        costs: 77000,
        upgradeDuration: "5d"
    }, {
        costs: 80000,
        upgradeDuration: "6d"
    }, {
        costs: 86000,
        upgradeDuration: "6d"
    }, {
        costs: 92000,
        upgradeDuration: "6d"
    }, {
        costs: 98000,
        upgradeDuration: "6d"
    }, {
        costs: 104000,
        upgradeDuration: "6d"
    }, {
        costs: 110000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 116000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 122000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 128000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 134000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 140000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 146000,
        upgradeDuration: "7d"
    }, {
        costs: 152000,
        upgradeDuration: "7d"
    }, {
        costs: 158000,
        upgradeDuration: "7d"
    }, {
        costs: 164000,
        upgradeDuration: "7d"
    }, {
        costs: 170000,
        upgradeDuration: "7d"
    }, {
        costs: 178000,
        upgradeDuration: "7d"
    }, {
        costs: 186000,
        upgradeDuration: "7d"
    }, {
        costs: 194000,
        upgradeDuration: "7d"
    }, {
        costs: 202000,
        upgradeDuration: "7d"
    }, {
        costs: 210000,
        upgradeDuration: "7d"
    }, {
        costs: 217000,
        upgradeDuration: "7d"
    }, {
        costs: 224000,
        upgradeDuration: "7d"
    }, {
        costs: 230000,
        upgradeDuration: "7d"
    }, {
        costs: 235000,
        upgradeDuration: "7d"
    }, {
        costs: 240000,
        upgradeDuration: "7d"
    }, {
        costs: 250000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 260000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 270000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 280000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 290000,
        upgradeDuration: "8d"
    }, {
        costs: 292000,
        upgradeDuration: "8d"
    }, {
        costs: 294000,
        upgradeDuration: "8d"
    }, {
        costs: 296000,
        upgradeDuration: "8d"
    }, {
        costs: 298000,
        upgradeDuration: "8d"
    }, {
        costs: 300000,
        upgradeDuration: "8d"
    }, {
        costs: 305000,
        upgradeDuration: "8d"
    }, {
        costs: 310000,
        upgradeDuration: "8d"
    }, {
        costs: 315000,
        upgradeDuration: "8d"
    }, {
        costs: 320000,
        upgradeDuration: "8d"
    }, {
        costs: 325000,
        upgradeDuration: "8d"
    }]
}), new HomeHero({
    name: "Archer Queen",
    levels: [{
        costs: 10000,
        upgradeDuration: "0s"
    }, {
        costs: 11000,
        upgradeDuration: "4h"
    }, {
        costs: 12000,
        upgradeDuration: "6h"
    }, {
        costs: 13000,
        upgradeDuration: "8h"
    }, {
        costs: 15000,
        upgradeDuration: "10h"
    }, {
        costs: 16000,
        upgradeDuration: "12h"
    }, {
        costs: 17000,
        upgradeDuration: "14h"
    }, {
        costs: 18000,
        upgradeDuration: "16h"
    }, {
        costs: 19000,
        upgradeDuration: "18h"
    }, {
        costs: 20000,
        upgradeDuration: "20h"
    }, {
        costs: 22000,
        upgradeDuration: "22h"
    }, {
        costs: 24000,
        upgradeDuration: "1d"
    }, {
        costs: 26000,
        upgradeDuration: "1d 8h"
    }, {
        costs: 28000,
        upgradeDuration: "1d 16h"
    }, {
        costs: 30000,
        upgradeDuration: "2d"
    }, {
        costs: 32000,
        upgradeDuration: "2d"
    }, {
        costs: 34000,
        upgradeDuration: "2d"
    }, {
        costs: 36000,
        upgradeDuration: "2d"
    }, {
        costs: 38000,
        upgradeDuration: "2d"
    }, {
        costs: 40000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 42000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 44000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 46000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 48000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 50000,
        upgradeDuration: "3d"
    }, {
        costs: 52000,
        upgradeDuration: "3d"
    }, {
        costs: 54000,
        upgradeDuration: "3d"
    }, {
        costs: 56000,
        upgradeDuration: "3d"
    }, {
        costs: 58000,
        upgradeDuration: "3d"
    }, {
        costs: 60000,
        upgradeDuration: "4d"
    }, {
        costs: 63000,
        upgradeDuration: "4d"
    }, {
        costs: 66000,
        upgradeDuration: "4d"
    }, {
        costs: 69000,
        upgradeDuration: "4d"
    }, {
        costs: 72000,
        upgradeDuration: "4d"
    }, {
        costs: 75000,
        upgradeDuration: "5d"
    }, {
        costs: 78000,
        upgradeDuration: "5d"
    }, {
        costs: 81000,
        upgradeDuration: "5d"
    }, {
        costs: 84000,
        upgradeDuration: "5d"
    }, {
        costs: 87000,
        upgradeDuration: "5d"
    }, {
        costs: 90000,
        upgradeDuration: "6d"
    }, {
        costs: 96000,
        upgradeDuration: "6d"
    }, {
        costs: 102000,
        upgradeDuration: "6d"
    }, {
        costs: 108000,
        upgradeDuration: "6d"
    }, {
        costs: 114000,
        upgradeDuration: "6d"
    }, {
        costs: 120000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 126000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 132000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 138000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 144000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 150000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 156000,
        upgradeDuration: "7d"
    }, {
        costs: 162000,
        upgradeDuration: "7d"
    }, {
        costs: 168000,
        upgradeDuration: "7d"
    }, {
        costs: 174000,
        upgradeDuration: "7d"
    }, {
        costs: 180000,
        upgradeDuration: "7d"
    }, {
        costs: 187000,
        upgradeDuration: "7d"
    }, {
        costs: 194000,
        upgradeDuration: "7d"
    }, {
        costs: 201000,
        upgradeDuration: "7d"
    }, {
        costs: 208000,
        upgradeDuration: "7d"
    }, {
        costs: 215000,
        upgradeDuration: "7d"
    }, {
        costs: 220000,
        upgradeDuration: "7d"
    }, {
        costs: 225000,
        upgradeDuration: "7d"
    }, {
        costs: 230000,
        upgradeDuration: "7d"
    }, {
        costs: 235000,
        upgradeDuration: "7d"
    }, {
        costs: 240000,
        upgradeDuration: "7d"
    }, {
        costs: 250000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 260000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 270000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 280000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 290000,
        upgradeDuration: "8d"
    }, {
        costs: 292000,
        upgradeDuration: "8d"
    }, {
        costs: 294000,
        upgradeDuration: "8d"
    }, {
        costs: 296000,
        upgradeDuration: "8d"
    }, {
        costs: 298000,
        upgradeDuration: "8d"
    }, {
        costs: 300000,
        upgradeDuration: "8d"
    }, {
        costs: 306000,
        upgradeDuration: "8d"
    }, {
        costs: 312000,
        upgradeDuration: "8d"
    }, {
        costs: 318000,
        upgradeDuration: "8d"
    }, {
        costs: 324000,
        upgradeDuration: "8d"
    }, {
        costs: 330000,
        upgradeDuration: "8d"
    }]
}), new HomeHero({
    name: "Grand Warden",
    levels: [{
        costs: 1000000,
        upgradeDuration: "0s"
    }, {
        costs: 1250000,
        upgradeDuration: "2h"
    }, {
        costs: 1500000,
        upgradeDuration: "4h"
    }, {
        costs: 1750000,
        upgradeDuration: "8h"
    }, {
        costs: 2000000,
        upgradeDuration: "12h"
    }, {
        costs: 2250000,
        upgradeDuration: "18h"
    }, {
        costs: 2500000,
        upgradeDuration: "1d"
    }, {
        costs: 2750000,
        upgradeDuration: "1d 6h"
    }, {
        costs: 3000000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 3500000,
        upgradeDuration: "2d"
    }, {
        costs: 4000000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 4500000,
        upgradeDuration: "3d"
    }, {
        costs: 5000000,
        upgradeDuration: "4d"
    }, {
        costs: 5500000,
        upgradeDuration: "5d"
    }, {
        costs: 6000000,
        upgradeDuration: "6d"
    }, {
        costs: 6500000,
        upgradeDuration: "7d"
    }, {
        costs: 7000000,
        upgradeDuration: "7d"
    }, {
        costs: 7500000,
        upgradeDuration: "7d"
    }, {
        costs: 8000000,
        upgradeDuration: "7d"
    }, {
        costs: 9000000,
        upgradeDuration: "7d"
    }, {
        costs: 10000000,
        upgradeDuration: "7d"
    }, {
        costs: 10100000,
        upgradeDuration: "7d"
    }, {
        costs: 10200000,
        upgradeDuration: "7d"
    }, {
        costs: 10300000,
        upgradeDuration: "7d"
    }, {
        costs: 10400000,
        upgradeDuration: "7d"
    }, {
        costs: 10500000,
        upgradeDuration: "7d"
    }, {
        costs: 10600000,
        upgradeDuration: "7d"
    }, {
        costs: 10700000,
        upgradeDuration: "7d"
    }, {
        costs: 10800000,
        upgradeDuration: "7d"
    }, {
        costs: 10900000,
        upgradeDuration: "7d"
    }, {
        costs: 11000000,
        upgradeDuration: "7d"
    }, {
        costs: 11100000,
        upgradeDuration: "7d"
    }, {
        costs: 11200000,
        upgradeDuration: "7d"
    }, {
        costs: 11300000,
        upgradeDuration: "7d"
    }, {
        costs: 11400000,
        upgradeDuration: "7d"
    }, {
        costs: 11500000,
        upgradeDuration: "7d"
    }, {
        costs: 11600000,
        upgradeDuration: "7d"
    }, {
        costs: 11700000,
        upgradeDuration: "7d"
    }, {
        costs: 11800000,
        upgradeDuration: "7d"
    }, {
        costs: 11900000,
        upgradeDuration: "7d"
    }, {
        costs: 12000000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 12500000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 13000000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 13500000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 14000000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 14500000,
        upgradeDuration: "8d"
    }, {
        costs: 15000000,
        upgradeDuration: "8d"
    }, {
        costs: 15500000,
        upgradeDuration: "8d"
    }, {
        costs: 16000000,
        upgradeDuration: "8d"
    }, {
        costs: 16500000,
        upgradeDuration: "8d"
    }, {
        costs: 17000000,
        upgradeDuration: "8d"
    }, {
        costs: 17500000,
        upgradeDuration: "8d"
    }, {
        costs: 18000000,
        upgradeDuration: "8d"
    }, {
        costs: 18500000,
        upgradeDuration: "8d"
    }, {
        costs: 19000000,
        upgradeDuration: "8d"
    }]
}), new HomeHero({
    name: "Royal Champion",
    levels: [{
        costs: 60000,
        upgradeDuration: "0s"
    }, {
        costs: 80000,
        upgradeDuration: "8h"
    }, {
        costs: 100000,
        upgradeDuration: "16h"
    }, {
        costs: 120000,
        upgradeDuration: "1d"
    }, {
        costs: 140000,
        upgradeDuration: "2d"
    }, {
        costs: 160000,
        upgradeDuration: "3d"
    }, {
        costs: 180000,
        upgradeDuration: "3d 12h"
    }, {
        costs: 190000,
        upgradeDuration: "4d"
    }, {
        costs: 200000,
        upgradeDuration: "4d 12h"
    }, {
        costs: 210000,
        upgradeDuration: "5d"
    }, {
        costs: 220000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 230000,
        upgradeDuration: "6d"
    }, {
        costs: 235000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 240000,
        upgradeDuration: "7d"
    }, {
        costs: 245000,
        upgradeDuration: "7d"
    }, {
        costs: 250000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 255000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 260000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 265000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 270000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 275000,
        upgradeDuration: "8d"
    }, {
        costs: 280000,
        upgradeDuration: "8d"
    }, {
        costs: 285000,
        upgradeDuration: "8d"
    }, {
        costs: 290000,
        upgradeDuration: "8d"
    }, {
        costs: 295000,
        upgradeDuration: "8d"
    }, {
        costs: 300000,
        upgradeDuration: "8d"
    }, {
        costs: 305000,
        upgradeDuration: "8d"
    }, {
        costs: 310000,
        upgradeDuration: "8d"
    }, {
        costs: 315000,
        upgradeDuration: "8d"
    }, {
        costs: 320000,
        upgradeDuration: "8d"
    }]
//------------PET------------\\
}), new HomePet({
    name: "L.A.S.S.I",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Pet House Lv. 1"
    }, {
        costs: 115000,
        upgradeDuration: "3d"
    }, {
        costs: 130000,
        upgradeDuration: "4d"
    }, {
        costs: 145000,
        upgradeDuration: "5d"
    }, {
        costs: 160000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 175000,
        upgradeDuration: "6d"
    }, {
        costs: 190000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 205000,
        upgradeDuration: "7d"
    }, {
        costs: 220000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 235000,
        upgradeDuration: "8d"
    }]
}), new HomePet({
    name: "Mighty Yak",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Pet House Lv. 2"
    }, {
        costs: 165000,
        upgradeDuration: "3d"
    }, {
        costs: 185000,
        upgradeDuration: "4d"
    }, {
        costs: 205000,
        upgradeDuration: "5d"
    }, {
        costs: 225000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 245000,
        upgradeDuration: "6d"
    }, {
        costs: 255000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 265000,
        upgradeDuration: "7d"
    }, {
        costs: 275000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 285000,
        upgradeDuration: "8d"
    }]
}), new HomePet({
    name: "Electro Owl",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Pet House Lv. 3"
    }, {
        costs: 135000,
        upgradeDuration: "3d"
    }, {
        costs: 150000,
        upgradeDuration: "4d"
    }, {
        costs: 165000,
        upgradeDuration: "5d"
    }, {
        costs: 180000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 195000,
        upgradeDuration: "6d"
    }, {
        costs: 210000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 225000,
        upgradeDuration: "7d"
    }, {
        costs: 240000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 255000,
        upgradeDuration: "8d"
    }]
}), new HomePet({
    name: "Unicorn",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Pet House Lv. 4"
    }, {
        costs: 210000,
        upgradeDuration: "3d"
    }, {
        costs: 220000,
        upgradeDuration: "4d"
    }, {
        costs: 230000,
        upgradeDuration: "5d"
    }, {
        costs: 240000,
        upgradeDuration: "5d 21h"
    }, {
        costs: 250000,
        upgradeDuration: "6d"
    }, {
        costs: 260000,
        upgradeDuration: "6d 12h"
    }, {
        costs: 270000,
        upgradeDuration: "7d"
    }, {
        costs: 280000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 290000,
        upgradeDuration: "8d"
    }]
//-----------TROOP-----------\\
}), new HomeOffense({
    name: "Barbarian",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 1"
    }, {
        costs: 20000,
        upgradeDuration: "2h"
    }, {
        costs: 60000,
        upgradeDuration: "5h"
    }, {
        costs: 200000,
        upgradeDuration: "12h"
    }, {
        costs: 650000,
        upgradeDuration: "1d"
    }, {
        costs: 1400000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2500000,
        upgradeDuration: "3d"
    }, {
        costs: 4000000,
        upgradeDuration: "4d 12h"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 1500000,
        upgradeDuration: "14d"
    }]
}), new HomeOffense({
    name: "Archer",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 2"
    }, {
        costs: 30000,
        upgradeDuration: "3h"
    }, {
        costs: 80000,
        upgradeDuration: "6h"
    }, {
        costs: 300000,
        upgradeDuration: "12h"
    }, {
        costs: 800000,
        upgradeDuration: "1d"
    }, {
        costs: 2000000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 3000000,
        upgradeDuration: "3d"
    }, {
        costs: 4500000,
        upgradeDuration: "5d"
    }, {
        costs: 9000000,
        upgradeDuration: "10d 12h"
    }, {
        costs: 15500000,
        upgradeDuration: "14d"
    }]
}), new HomeOffense({
    name: "Giant",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 3"
    }, {
        costs: 40000,
        upgradeDuration: "4h"
    }, {
        costs: 150000,
        upgradeDuration: "8h"
    }, {
        costs: 500000,
        upgradeDuration: "12h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 2000000,
        upgradeDuration: "2d"
    }, {
        costs: 3500000,
        upgradeDuration: "4d"
    }, {
        costs: 5000000,
        upgradeDuration: "8d"
    }, {
        costs: 9000000,
        upgradeDuration: "13d"
    }, {
        costs: 13000000,
        upgradeDuration: "15d"
    }]
}), new HomeOffense({
    name: "Goblin",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 4"
    }, {
        costs: 45000,
        upgradeDuration: "5h"
    }, {
        costs: 175000,
        upgradeDuration: "9h"
    }, {
        costs: 500000,
        upgradeDuration: "12h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 2000000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 3500000,
        upgradeDuration: "4d"
    }, {
        costs: 9000000,
        upgradeDuration: "12d"
    }]
}), new HomeOffense({
    name: "Wall Breaker",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 5"
    }, {
        costs: 100000,
        upgradeDuration: "6h"
    }, {
        costs: 250000,
        upgradeDuration: "12h"
    }, {
        costs: 600000,
        upgradeDuration: "18h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 3000000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 6000000,
        upgradeDuration: "5d"
    }, {
        costs: 10500000,
        upgradeDuration: "10d"
    }, {
        costs: 13000000,
        upgradeDuration: "14d 12h"
    }, {
        costs: 16000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Balloon",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 6"
    }, {
        costs: 125000,
        upgradeDuration: "8h"
    }, {
        costs: 400000,
        upgradeDuration: "12h"
    }, {
        costs: 800000,
        upgradeDuration: "18h"
    }, {
        costs: 1500000,
        upgradeDuration: "1d"
    }, {
        costs: 2750000,
        upgradeDuration: "3d 12h"
    }, {
        costs: 6500000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 11000000,
        upgradeDuration: "13d 12h"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }, {
        costs: 18000000,
        upgradeDuration: "18d"
    }]
}), new HomeOffense({
    name: "Wizard",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 7"
    }, {
        costs: 120000,
        upgradeDuration: "8h"
    }, {
        costs: 320000,
        upgradeDuration: "12h"
    }, {
        costs: 620000,
        upgradeDuration: "18h"
    }, {
        costs: 1200000,
        upgradeDuration: "1d"
    }, {
        costs: 2200000,
        upgradeDuration: "2d"
    }, {
        costs: 4200000,
        upgradeDuration: "4d"
    }, {
        costs: 7200000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 9200000,
        upgradeDuration: "12d 12h"
    }, {
        costs: 14200000,
        upgradeDuration: "14d 12h"
    }]
}), new HomeOffense({
    name: "Healer",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 8"
    }, {
        costs: 450000,
        upgradeDuration: "12h"
    }, {
        costs: 900000,
        upgradeDuration: "1d"
    }, {
        costs: 2700000,
        upgradeDuration: "2d"
    }, {
        costs: 6000000,
        upgradeDuration: "10d"
    }, {
        costs: 13000000,
        upgradeDuration: "14d"
    }, {
        costs: 17000000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Dragon",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 9"
    }, {
        costs: 1000000,
        upgradeDuration: "18h"
    }, {
        costs: 2000000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 3000000,
        upgradeDuration: "3d"
    }, {
        costs: 4500000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "8d"
    }, {
        costs: 10000000,
        upgradeDuration: "14d"
    }, {
        costs: 15000000,
        upgradeDuration: "16d"
    }, {
        costs: 18500000,
        upgradeDuration: "18d"
    }]
}), new HomeOffense({
    name: "P.E.K.K.A",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 10"
    }, {
        costs: 1200000,
        upgradeDuration: "12h"
    }, {
        costs: 1800000,
        upgradeDuration: "1d"
    }, {
        costs: 2800000,
        upgradeDuration: "2d"
    }, {
        costs: 3800000,
        upgradeDuration: "4d"
    }, {
        costs: 5000000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 7500000,
        upgradeDuration: "8d 12h"
    }, {
        costs: 11000000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "15d"
    }]
}), new HomeOffense({
    name: "Baby Dragon",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 11"
    }, {
        costs: 2000000,
        upgradeDuration: "2d"
    }, {
        costs: 3000000,
        upgradeDuration: "4d"
    }, {
        costs: 4000000,
        upgradeDuration: "6d"
    }, {
        costs: 6000000,
        upgradeDuration: "9d"
    }, {
        costs: 9000000,
        upgradeDuration: "12d"
    }, {
        costs: 12000000,
        upgradeDuration: "14d"
    }, {
        costs: 17000000,
        upgradeDuration: "16d 12h"
    }]
}), new HomeOffense({
    name: "Miner",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 12"
    }, {
        costs: 3000000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 4000000,
        upgradeDuration: "4d"
    }, {
        costs: 5000000,
        upgradeDuration: "6d"
    }, {
        costs: 7000000,
        upgradeDuration: "10d"
    }, {
        costs: 9500000,
        upgradeDuration: "13d"
    }, {
        costs: 13000000,
        upgradeDuration: "15d 12h"
    }, {
        costs: 17500000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Electro Dragon",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 13"
    }, {
        costs: 9000000,
        upgradeDuration: "8d"
    }, {
        costs: 11000000,
        upgradeDuration: "14d"
    }, {
        costs: 16000000,
        upgradeDuration: "16d"
    }, {
        costs: 19000000,
        upgradeDuration: "18d"
    }]
}), new HomeOffense({
    name: "Yeti",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 14"
    }, {
        costs: 11000000,
        upgradeDuration: "11d"
    }, {
        costs: 15000000,
        upgradeDuration: "16d"
    }, {
        costs: 18000000,
        upgradeDuration: "18d"
    }]
}), new HomeOffense({
    name: "Dragon Rider",
    type: "troop",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Barracks Lv. 15"
    }, {
        costs: 16000000,
        upgradeDuration: "15d"
    }, {
        costs: 17500000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Minion",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 1"
    }, {
        costs: 3000,
        upgradeDuration: "8h"
    }, {
        costs: 7000,
        upgradeDuration: "16h"
    }, {
        costs: 15000,
        upgradeDuration: "1d"
    }, {
        costs: 25000,
        upgradeDuration: "2d"
    }, {
        costs: 40000,
        upgradeDuration: "4d"
    }, {
        costs: 90000,
        upgradeDuration: "7d"
    }, {
        costs: 150000,
        upgradeDuration: "14d"
    }, {
        costs: 250000,
        upgradeDuration: "15d 12h"
    }, {
        costs: 300000,
        upgradeDuration: "16d 12h"
    }]
}), new HomeOffense({
    name: "Hog Rider",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 2"
    }, {
        costs: 5000,
        upgradeDuration: "10h"
    }, {
        costs: 9000,
        upgradeDuration: "20h"
    }, {
        costs: 16000,
        upgradeDuration: "1d 6h"
    }, {
        costs: 30000,
        upgradeDuration: "2d"
    }, {
        costs: 50000,
        upgradeDuration: "4d"
    }, {
        costs: 100000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 150000,
        upgradeDuration: "11d 12h"
    }, {
        costs: 240000,
        upgradeDuration: "14d"
    }, {
        costs: 280000,
        upgradeDuration: "16d"
    }, {
        costs: 320000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Valkyrie",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 3"
    }, {
        costs: 8000,
        upgradeDuration: "1d"
    }, {
        costs: 12000,
        upgradeDuration: "2d"
    }, {
        costs: 25000,
        upgradeDuration: "3d"
    }, {
        costs: 45000,
        upgradeDuration: "5d"
    }, {
        costs: 90000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 175000,
        upgradeDuration: "11d"
    }, {
        costs: 260000,
        upgradeDuration: "16d"
    }, {
        costs: 310000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Golem",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 4"
    }, {
        costs: 10000,
        upgradeDuration: "1d 6h"
    }, {
        costs: 20000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 30000,
        upgradeDuration: "3d 18h"
    }, {
        costs: 50000,
        upgradeDuration: "5d"
    }, {
        costs: 75000,
        upgradeDuration: "7d"
    }, {
        costs: 110000,
        upgradeDuration: "8d"
    }, {
        costs: 160000,
        upgradeDuration: "10d 12h"
    }, {
        costs: 200000,
        upgradeDuration: "14d"
    }, {
        costs: 270000,
        upgradeDuration: "16d"
    }, {
        costs: 320000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Witch",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 5"
    }, {
        costs: 50000,
        upgradeDuration: "4d"
    }, {
        costs: 80000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 130000,
        upgradeDuration: "9d 12h"
    }, {
        costs: 200000,
        upgradeDuration: "14d"
    }]
}), new HomeOffense({
    name: "Lava Hound",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 6"
    }, {
        costs: 35000,
        upgradeDuration: "2d 12h"
    }, {
        costs: 60000,
        upgradeDuration: "5d"
    }, {
        costs: 120000,
        upgradeDuration: "9d"
    }, {
        costs: 190000,
        upgradeDuration: "14d"
    }, {
        costs: 270000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Bowler",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 7"
    }, {
        costs: 75000,
        upgradeDuration: "4d"
    }, {
        costs: 125000,
        upgradeDuration: "7d"
    }, {
        costs: 200000,
        upgradeDuration: "12d"
    }, {
        costs: 280000,
        upgradeDuration: "14d 12h"
    }, {
        costs: 320000,
        upgradeDuration: "17d 12h"
    }]
}), new HomeOffense({
    name: "Ice Golem",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 8"
    }, {
        costs: 80000,
        upgradeDuration: "4d"
    }, {
        costs: 120000,
        upgradeDuration: "7d"
    }, {
        costs: 160000,
        upgradeDuration: "10d 12h"
    }, {
        costs: 200000,
        upgradeDuration: "14d"
    }, {
        costs: 320000,
        upgradeDuration: "17d"
    }]
}), new HomeOffense({
    name: "Headhunter",
    type: "darkTroop",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Barracks Lv. 9"
    }, {
        costs: 180000,
        upgradeDuration: "14d"
    }, {
        costs: 240000,
        upgradeDuration: "16d"
    }]
//-----------SPELL-----------\\
}), new HomeOffense({
    name: "Lightning Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 1"
    }, {
        costs: 50000,
        upgradeDuration: "4h"
    }, {
        costs: 100000,
        upgradeDuration: "8h"
    }, {
        costs: 200000,
        upgradeDuration: "12h"
    }, {
        costs: 600000,
        upgradeDuration: "1d"
    }, {
        costs: 1500000,
        upgradeDuration: "4d"
    }, {
        costs: 3000000,
        upgradeDuration: "7d"
    }, {
        costs: 6000000,
        upgradeDuration: "10d 12h"
    }, {
        costs: 10000000,
        upgradeDuration: "13d"
    }]
}), new HomeOffense({
    name: "Healing Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 2"
    }, {
        costs: 75000,
        upgradeDuration: "5h"
    }, {
        costs: 150000,
        upgradeDuration: "10h"
    }, {
        costs: 300000,
        upgradeDuration: "20h"
    }, {
        costs: 900000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 1800000,
        upgradeDuration: "4d"
    }, {
        costs: 3600000,
        upgradeDuration: "7d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Rage Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 3"
    }, {
        costs: 400000,
        upgradeDuration: "12h"
    }, {
        costs: 800000,
        upgradeDuration: "1d"
    }, {
        costs: 1600000,
        upgradeDuration: "2d"
    }, {
        costs: 2400000,
        upgradeDuration: "4d"
    }, {
        costs: 11000000,
        upgradeDuration: "11d 12h"
    }]
}), new HomeOffense({
    name: "Jump Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 4"
    }, {
        costs: 2000000,
        upgradeDuration: "4d"
    }, {
        costs: 4000000,
        upgradeDuration: "7d"
    }, {
        costs: 12000000,
        upgradeDuration: "15d"
    }]
}), new HomeOffense({
    name: "Freeze Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 4"
    }, {
        costs: 1200000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 2000000,
        upgradeDuration: "3d"
    }, {
        costs: 3600000,
        upgradeDuration: "5d"
    }, {
        costs: 5000000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 8500000,
        upgradeDuration: "9d"
    }, {
        costs: 11000000,
        upgradeDuration: "11d 12h"
    }]
}), new HomeOffense({
    name: "Clone Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 5"
    }, {
        costs: 2500000,
        upgradeDuration: "2d"
    }, {
        costs: 4000000,
        upgradeDuration: "4d"
    }, {
        costs: 6000000,
        upgradeDuration: "5d 12h"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 12000000,
        upgradeDuration: "15d"
    }, {
        costs: 16500000,
        upgradeDuration: "16d 12h"
    }]
}), new HomeOffense({
    name: "Invisibility Spell",
    type: "spell",
    costType: "elixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Spell Factory Lv. 6"
    }, {
        costs: 9000000,
        upgradeDuration: "9d"
    }, {
        costs: 12000000,
        upgradeDuration: "11d 12h"
    }, {
        costs: 15000000,
        upgradeDuration: "15d 12h"
    }]
}), new HomeOffense({
    name: "Poison Spell",
    type: "spell",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Spell Factory Lv. 1"
    }, {
        costs: 12000,
        upgradeDuration: "8h"
    }, {
        costs: 25000,
        upgradeDuration: "1d"
    }, {
        costs: 50000,
        upgradeDuration: "3d"
    }, {
        costs: 100000,
        upgradeDuration: "9d"
    }, {
        costs: 175000,
        upgradeDuration: "11d"
    }, {
        costs: 260000,
        upgradeDuration: "15d 12h"
    }, {
        costs: 300000,
        upgradeDuration: "17d 12h"
    }]
}), new HomeOffense({
    name: "Earthquake Spell",
    type: "spell",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Spell Factory Lv. 2"
    }, {
        costs: 15000,
        upgradeDuration: "18h"
    }, {
        costs: 30000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 60000,
        upgradeDuration: "5d"
    }, {
        costs: 120000,
        upgradeDuration: "11d"
    }]
}), new HomeOffense({
    name: "Haste Spell",
    type: "spell",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Spell Factory Lv. 3"
    }, {
        costs: 20000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 40000,
        upgradeDuration: "3d"
    }, {
        costs: 70000,
        upgradeDuration: "6d"
    }, {
        costs: 110000,
        upgradeDuration: "11d"
    }]
}), new HomeOffense({
    name: "Skeleton Spell",
    type: "spell",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Spell Factory Lv. 4"
    }, {
        costs: 25000,
        upgradeDuration: "1d 12h"
    }, {
        costs: 40000,
        upgradeDuration: "3d"
    }, {
        costs: 70000,
        upgradeDuration: "6d"
    }, {
        costs: 125000,
        upgradeDuration: "8d 12h"
    }, {
        costs: 150000,
        upgradeDuration: "10d 12h"
    }, {
        costs: 250000,
        upgradeDuration: "15d"
    }]
}), new HomeOffense({
    name: "Bat Spell",
    type: "spell",
    costType: "darkElixir",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Dark Spell Factory Lv. 5"
    }, {
        costs: 30000,
        upgradeDuration: "2d"
    }, {
        costs: 60000,
        upgradeDuration: "4d"
    }, {
        costs: 100000,
        upgradeDuration: "7d 12h"
    }, {
        costs: 150000,
        upgradeDuration: "9d"
    }]
//-------SIEGE MACHINE-------\\
}), new HomeOffense({
    name: "Wall Wrecker",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 1"
    }, {
        costs: 6000000,
        upgradeDuration: "8d"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Battle Blimp",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 2"
    }, {
        costs: 6000000,
        upgradeDuration: "8d"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Stone Slammer",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 3"
    }, {
        costs: 6000000,
        upgradeDuration: "8d"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Siege Barracks",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 4"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 11000000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Log Launcher",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 5"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 11000000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
}), new HomeOffense({
    name: "Flame Flinger",
    type: "siegeMachine",
    levels: [{
        costs: 0,
        upgradeDuration: "0s",
        text: "Workshop Lv. 6"
    }, {
        costs: 8000000,
        upgradeDuration: "10d"
    }, {
        costs: 11000000,
        upgradeDuration: "14d"
    }, {
        costs: 14000000,
        upgradeDuration: "16d"
    }]
})];