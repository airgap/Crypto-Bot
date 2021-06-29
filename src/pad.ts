export const pad = (text: string | number, amount: number, char: string | number = ' ') =>
    (char + '').repeat(amount - (text + '').length) + text;
