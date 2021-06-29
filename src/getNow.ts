import {pad} from "./pad";

export const getNow = (tz = 'EST', offset = -5) => {
    const d = new Date();
    d.setHours(d.getHours() + offset);
    const [h, m, s] = ['Hours', 'Minutes', 'Seconds'].map(k => pad(d['get' + k](), 2, '0'));
    const time = `${h}:${m}:${s} ${tz}`;
    return time;
}