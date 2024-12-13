export default function formatTime(dateString: string): [number, string] {
    const now = new Date();
    const date = new Date(dateString);
    let time = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (time < 60) return [time, "secondsago"];
    time = Math.floor(time / 60);
    if (time < 60) return [time, "minutesago"];
    time = Math.floor(time / 60);
    if (time < 24) return [time, "hoursago"];
    time = Math.floor(time / 24);
    if (time < 30) return [time, "daysago"];
    time = Math.floor(time / 30);
    if (time < 12) return [time, "monthsago"];
    time = Math.floor(time / 12);
    return [time, "yearsago"];
}