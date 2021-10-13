
import React from 'react';
import { invoices, plays } from './state';
import { InvoiceType, PlaysObjType, PlayObjType, PerformanceType,PlayShortName } from './types';


function amountFor ( aPerformance:PerformanceType) {
    let result = 0; 
    switch (playFor(aPerformance).type) {
        case 'tragedy':
            result = 40000;
            if (aPerformance.audience>30) {
                result+=1000*(aPerformance.audience-30)
            }
            break
        case 'comedy':
            result = 30000;
            if (aPerformance.audience>20) {
                result+=10000+500*(aPerformance.audience-20)
            }
            result +=300*aPerformance.audience;
            break
        default: 
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
}

function playFor (aPerformance:PerformanceType):PlayObjType{
    return plays[aPerformance.playID]
}

function volumeCreditsFor (aPerformance:PerformanceType){
    let result = 0;
        result += Math.max(aPerformance.audience-30,0);
        if ('comedy'===playFor(aPerformance).type) result +=Math.floor(aPerformance.audience/5);
        return result
}

function formatFor (aNumber:number){
    return new Intl.NumberFormat('en-US',
                    {
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 2
                    }).format(aNumber)
}

export function statement (invoice:InvoiceType, plays: PlaysObjType) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    for (let perf of invoice.performances){
        volumeCredits += volumeCreditsFor(perf);
        //print line for this order 
        result += `${playFor(perf).name}: ${formatFor(amountFor(perf)/100)} (${perf.audience} seats)\n`;
        totalAmount +=amountFor(perf);
    }
    result += `Amount owed is ${formatFor(totalAmount/100)}\n`;
    result += `You earned $${volumeCredits} credits\n`;

    return result
}

let brutto = statement(invoices, plays);

export default brutto; 