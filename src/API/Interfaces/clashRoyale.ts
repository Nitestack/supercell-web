export interface CRProfile {
    tag: string,
    name: string,
    expLevel: number,
    starPoints: number,
    trophies: number,
    bestTrophies: number,
    wins: number,
    losses: number,
    battleCount: number,
    threeCrownWins: number,
    challengeCardsWon: number,
    challengeMaxWins: number,
    tournamentCardsWon: number,
    tournamentBattleCount: number,
    role: 'coLeader' | 'member' | 'elder' | 'leader',
    donations: number,
    donationsReceived: number,
    totalDonations: number,
    warDayWins: number,
    clanCardsCollected: number,
    clan: { tag: string, name: string, badgeId: number },
    arena: { id: number, name: string },
    leagueStatistics?: {
        //Added by function ("name" of each season)
        currentSeason: { rank?: number, trophies: number, bestTrophies: number, name: string, bestName: string },
        previousSeason: { id: string, rank?: number, trophies: number, bestTrophies: number, name: string },
        bestSeason: { id: string, rank?: number, trophies: number, name: string }
    },
    badges: Array<{
        name: string,
        progress: number,
        level?: number,
        maxLevel?: number,
        target?: number
    }>,
    achievements: Array<{
        name: string,
        stars: number,
        value: number,
        target: number,
        info: string,
        completionInfo: null
    }>,
    cards: Array<CRCard>,
    currentDeck: Array<CRCard>,
    //Added by function
    currentDeckAverageElixirCost: number,
    //Added by function
    currentDeckLink: string,
    //Added by function
    currentDeckMobileLink: string,
    currentFavouriteCard: CRCard
};

export interface CRCard {
    name: string,
    id: number,
    level: number,
    starLevel?: 1 | 2 | 3;
    maxLevel: number,
    count: number,
    iconUrls: {
        medium: string
    }
};