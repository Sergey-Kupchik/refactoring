
import { invoices, plays } from './state';
import { InvoiceType, PerformanceType, PlayObjType, PlaysObjType, aPerformanceType } from './types';




function renderPlainText(data: InvoiceType) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned $${totalVolumeCredits()} credits\n`;
    return result

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.volumeCredits;
        }
        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            result += perf.amount;
        }
        return result
    }

    function usd(aNumber: number) {
        return new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(aNumber / 100)
    }
}

export function statement(invoice: InvoiceType, plays: PlaysObjType) {
    const statementData = {} as any 
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData);

    function enrichPerformance(aPerformance: aPerformanceType) {
        const result = Object.assign({}, aPerformance)
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result

        function playFor(aPerformance: PerformanceType): PlayObjType {
            return plays[aPerformance.playID]
        }
        function amountFor(aPerformance: aPerformanceType) {
            let result = 0;
            switch (aPerformance.play.type) {
                case 'tragedy':
                    result = 40000;
                    if (aPerformance.audience > 30) {
                        result += 1000 * (aPerformance.audience - 30)
                    }
                    break
                case 'comedy':
                    result = 30000;
                    if (aPerformance.audience > 20) {
                        result += 10000 + 500 * (aPerformance.audience - 20)
                    }
                    result += 300 * aPerformance.audience;
                    break
                default:
                    throw new Error(`unknown type: ${aPerformance.play.type}`);
            }
            return result;
        }
        function volumeCreditsFor(aPerformance: aPerformanceType) {
            let result = 0;
            result += Math.max(aPerformance.audience - 30, 0);
            if ('comedy' === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
            return result
        }


    }

    
};

let brutto = statement(invoices, plays);

export default brutto;