import { statement } from './components/statement';
import { invoices, plays } from './components/state';

test('func Statement should return the same message', () => {
let result = statement(invoices, plays);
let goodResult = 'Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $580.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned $47 credits\n'
expect(result).toBe(goodResult) 
});
