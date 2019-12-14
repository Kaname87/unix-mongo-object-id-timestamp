import 'datejs'
import { determine } from 'jstz'
import moment from 'moment'

const DATE_FORMAT = 'MMM. DD, YYYY HH:mm:ss'

export const timezoneName = determine().name()


const minDate = new Date(0)
const maxDate = new Date(parseInt("ffffffff", 16) * 1000);


export function objectIdFromDate(date) {
    if (date < minDate || date > maxDate) {
        return "Error: date must be between " + minDate.getFullYear() +
            " and " + maxDate.getFullYear();
    }
    const pad = "00000000";
    const hexSeconds = Math.floor(date.getTime() / 1000).toString(16)
    return pad.substring(0, pad.length - hexSeconds.length) + hexSeconds + "0000000000000000";
};

export function dateFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

export function timestampFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getTime();
};



export function timezoneOffsetValue() {
    return - new Date().getTimezoneOffset() / 60;
}

export function formatMongoObjectId(objectId) {
    return `ObjectId("${objectId}")`
}