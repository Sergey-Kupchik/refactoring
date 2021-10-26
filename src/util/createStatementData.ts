import { InvoiceType, PerformanceType, PlayObjType, PlaysObjType, aPerformanceType, } from '../components/types';


function createStatementData(invoice: InvoiceType, plays: PlaysObjType) {
    const statementData = {} as InvoiceType
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance: aPerformanceType) {
        const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance))
        const result = Object.assign({}, aPerformance)
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = volumeCreditsFor(result);
        return result
    }

    function playFor(aPerformance: PerformanceType): PlayObjType {
        return plays[aPerformance.playID]
    }

    function volumeCreditsFor(aPerformance: aPerformanceType) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ('comedy' === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        return result
    }
    function totalAmount(data: InvoiceType) {
        return data.performances.reduce((total, p) => total + p.amount, 0)
    }
    function totalVolumeCredits(data: InvoiceType) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
    }
}

class PerformanceCalculator {
    performance: aPerformanceType;
    play: PlayObjType;
    constructor(aPerformance: aPerformanceType, aPlay: PlayObjType) {
        this.performance = aPerformance
        this.play = aPlay
    }
    get amount() {
        let result = 0;
        switch (this.play.type) {
            case 'tragedy':
                result = 40000;
                if (this.performance.audience > 30) {
                    result += 1000 * (this.performance.audience - 30)
                }
                break
            case 'comedy':
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20)
                }
                result += 300 * this.performance.audience;
                break
            default:
                throw new Error(`unknown type: ${this.play.type}`);
        }
        return result;
    }
}
export default createStatementData;
