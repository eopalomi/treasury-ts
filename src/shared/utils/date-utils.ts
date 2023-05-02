export const formatedDateYYYYMMDD_hhmmss = (date: Date): string => {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDay().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minuts = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const miliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return `${year}-${month}-${day} ${hour}:${minuts}:${seconds}.${miliseconds}`
};