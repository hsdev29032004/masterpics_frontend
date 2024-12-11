export const formatNumber = (num: number) => {
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