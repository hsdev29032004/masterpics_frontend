export const formatNumber1 = (num: number) => {
    if (num < 1e3) {
        return Math.floor(num);
    } else if (num >= 1e3 && num < 1e6) {
        return Math.floor(num / 1e3 * 10) / 10 + 'K';
    } else if (num >= 1e6 && num < 1e9) {
        return Math.floor(num / 1e6 * 10) / 10 + 'M';
    } else if (num >= 1e9) {
        return Math.floor(num / 1e9 * 10) / 10 + 'B';
    }
}

export function formatNumber2(num: number): string {
    if(isNaN(num)) return ""

    let [integerPart, decimalPart] = num.toString().split(".");
    let result = "";
    let count = 0;

    for (let i = integerPart.length - 1; i >= 0; i--) {
        result = integerPart[i] + result;
        count++;
        if (count === 3 && i !== 0) {
            result = "," + result;
            count = 0;
        }
    }

    if (decimalPart) {
        result += "." + decimalPart;
    }

    return result;
}