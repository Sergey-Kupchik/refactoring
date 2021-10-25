
import { invoices, plays } from './state';
import { InvoiceType, PerformanceType, PlayObjType, PlaysObjType, aPerformanceType } from './types';




function renderPlainText(data: InvoiceType, plays: PlaysObjType) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned $${totalVolumeCredits()} credits\n`;
    return result

    function totalVolumeCredits() {
        let result = 0;
        for (let perf of data.performances) {
            result += volumeCreditsFor(perf);
        }
        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let perf of data.performances) {
            result += amountFor(perf);
        }
        return result
    }

    function amountFor(aPerformance: PerformanceType) {
        let result = 0;
        switch (playFor(aPerformance).type) {
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
                throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }

    function playFor(aPerformance: PerformanceType): PlayObjType {
        return plays[aPerformance.playID]
    }

    function volumeCreditsFor(aPerformance: PerformanceType) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ('comedy' === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
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
    const statementData = {} as InvoiceType
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    return renderPlainText(statementData, plays);

    function enrichPerformance(aPerformance: aPerformanceType) {
        const result = Object.assign({}, aPerformance)
        return result
    }
};

let brutto = statement(invoices, plays);

export default brutto;