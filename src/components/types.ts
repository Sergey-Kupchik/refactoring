

export type PlayShortName = 'hamlet' | 'as-like' | 'othello';
export type PlayName = 'Hamlet' | 'As You Like It' | 'Othello';
export type PlayType = 'tragedy' | 'comedy'

export type PlaysObjType = {
    "hamlet": {
        "name": PlayName,
        'type': PlayType,
    },
    'as-like': {
        "name": PlayName,
        'type': PlayType,
    },
    'othello': {
        "name": PlayName,
        'type': PlayType,
    },
};

export type PerformanceType = {
    'playID': PlayShortName,
    'audience': number
}

export type InvoiceType = {
    'customer': 'BigCo',
    'performances': Array<PerformanceType>
}

// export default {InvoiceType, PerformanceType, PlaysObjType, PlayType, PlayName, PlayShortName}; 
