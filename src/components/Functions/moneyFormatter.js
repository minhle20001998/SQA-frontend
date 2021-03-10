export default function moneyFormatter(money) {
    return Intl.NumberFormat().format(money);
}