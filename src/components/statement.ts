
import React from 'react';
import { InvoiceType, PlaysObjType } from './types';


function statement (invoice:InvoiceType, plays: PlaysObjType) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;
    const format = new Intl.NumberFormat('en-US',
                    {
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 2
                    }).format;

    for (let perf of invoice.performances){
        const play = plays[perf.playID];
        let thisAmount = 0;
        
        switch (play.type) {
            case 'tragedy':
                thisAmount = 40000;
                if (perf.audience>30) {
                    thisAmount+=1000*(perf.audience-30)
                }
                break;
            case 'comedy':
                thisAmount = 30000;
                if (perf.audience>20) {
                    thisAmount+=1000+500*(perf.audience-20)
                }
                thisAmount +=300*perf.audience;
                break;
            default: {
                throw new Error(`unknown type: ${play.type}`);
                
            }
        }
    }
}