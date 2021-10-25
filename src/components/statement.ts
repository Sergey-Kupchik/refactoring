
import { invoices, plays } from './state';
import { InvoiceType, PerformanceType, PlayObjType, PlaysObjType, aPerformanceType } from './types';
import createStatementData from './../util/createStatementData';




function renderPlainText(data: InvoiceType) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned $${data.totalVolumeCredits} credits\n`;
    return result

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
    return renderPlainText(createStatementData(invoice,plays));
};



let brutto = statement(invoices, plays);

export default brutto;