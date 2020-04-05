const { sum } = require('./userRoute')

test('hello test', () => {
    expect(sum(1, 2)).toBe(3);
});