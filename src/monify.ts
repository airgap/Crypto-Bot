const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 20
});

export const monify = (money: string) => moneyFormatter.format(parseFloat(money))
