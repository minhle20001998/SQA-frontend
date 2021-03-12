exports.moneyFormatter = (money) => {
    return Intl.NumberFormat().format(money);
}
