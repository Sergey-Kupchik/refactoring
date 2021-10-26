

export type PlayShortName = 'hamlet' | 'as-like' | 'othello';
export type PlayName = 'Hamlet' | 'As You Like It' | 'Othello';
export type PlayType = 'tragedy' | 'comedy';
export type PlayObjType = {
        "name": PlayName,
        'type': PlayType,
};

export type PlaysObjType = {
    "hamlet": PlayObjType,
    'as-like': PlayObjType,
    'othello': PlayObjType,
};

export type PerformanceType = {
    'playID': PlayShortName,
    'audience': number
}

export type aPerformanceType = {
    'playID': PlayShortName,
    'audience': number,
     play: PlayObjType,
     amount: number, 
     volumeCredits: number 
}

export type InvoiceType = {
    'customer': 'BigCo',
    'performances': Array<aPerformanceType>,
    'totalAmount': number,
    'totalVolumeCredits': number,
}


// export default {InvoiceType, PerformanceType, PlaysObjType, PlayType, PlayName, PlayShortName}; 
