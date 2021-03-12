const { moneyFormatter } = require("../components/Functions/moneyFormatter.js")
const { removeVietnameseTones } = require("../components/Functions/removeVietnamese.js");

test('money formatted', () => {
    const money = moneyFormatter(2000);
    expect(money).toBe("2,000");
})

test('money formatted', () => {
    const money = moneyFormatter(200);
    expect(money).toBe("200");
})

test('money formatted', () => {
    const money = moneyFormatter(200);
    expect(money).toBe("200");
})

test('money formatted', () => {
    const money = moneyFormatter("aa");
    expect(money).toBe("NaN");
})

test('vietnamese removed', () => {
    const removed = removeVietnameseTones("lê minh");
    expect(removed).toBe("le minh");
})

test('vietnamese removed', () => {
    const removed = removeVietnameseTones("lêtuấn");
    expect(removed).toBe("letuan");
})


test('vietnamese removed', () => {
    const removed = removeVietnameseTones("le tuan");
    expect(removed).toBe("le tuan");
})

test('vietnamese removed', () => {
    const removed = removeVietnameseTones("1 2 3");
    expect(removed).toBe("1 2 3");
})




