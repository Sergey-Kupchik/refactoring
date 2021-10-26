
import createStatementData from './../util/createStatementData';
import { invoices, plays } from './state';
import { InvoiceType, PlaysObjType } from './types';


export function statement(invoice: InvoiceType, plays: PlaysObjType) {
    return renderPlainText(createStatementData(invoice, plays));
};

function renderPlainText(data: InvoiceType) {
    let result = `Statement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned $${data.totalVolumeCredits} credits\n`;
    return result
}


function htmlStatement(invoice: InvoiceType, plays: PlaysObjType) {
    return renderHtml(createStatementData(invoice, plays));
};

function renderHtml(data: InvoiceType) {
    let result = `<h1> Statement for ${data.customer}</h1>\n`;
    result += `<table>\n`;
    result += `<tr>
                    <th>play</th>
                    <th>seats</th>
                    <th>ccst</th>
               </tr>\n`;
    for (let perf of data.performances) {
        result += `<tr><td>${perf.play.name}</tr></td>`;
        result += `<tr><td>${perf.audience}</tr></td>`;
        result += `<tr><td>${usd(perf.amount)}</tr></td>`;
    }
    result += `</table>\n`;
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `Amount owed is ${usd(data.totalAmount)}\n`;
    result += `You earned $${data.totalVolumeCredits} credits\n`;
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




let brutto = htmlStatement(invoices, plays);

export default brutto;