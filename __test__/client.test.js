import { countDown } from '../src/client/js/countDown';

describe('Client utilities', () => {
    it('calculates the correct countdown days', () => {
        const today = new Date();
        const travelDate = new Date(today.getTime() + 86400000); // Add one day
        const daysLeft = countDown(travelDate.toISOString());
        expect(daysLeft).toBe(1);
    });
});