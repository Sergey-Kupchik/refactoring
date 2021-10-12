import { InvoiceType, PlaysObjType } from "./types";


const plays: PlaysObjType = {
    'hamlet': {
        "name": "Hamlet", 
        "type": "tragedy",
    },
    'as-like': {
        "name": "As You Like It", 
        "type": "comedy",
    },
    'othello': {
        "name": "Othello", 
        "type": "tragedy",
    },
};


const invoices: InvoiceType = {
    'customer': 'BigCo',
    'performances': [
    {
        'playID': 'hamlet',
        'audience': 55,
    },
    {
        'playID': 'as-like',
        'audience': 35,
    },
    {
        'playID': 'othello',
        'audience': 40,
    },
    ]
};

export {plays, invoices}; 