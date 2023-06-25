export const getCurrentTime = (time: number) => {
    let timeOnly: string = '';

    if (time) {
        const datetimeObj = new Date(time);
        timeOnly = datetimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    }

    return timeOnly;

}
