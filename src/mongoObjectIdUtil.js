const minDate = new Date(0)
const maxDate = new Date(parseInt("ffffffff", 16) * 1000);

const isInvalidDateRange = (date) => (
    date < minDate || date > maxDate
)

export function getObjectIdFromDate(date) {
    if (isInvalidDateRange(date)) {
        return;
    }
    const pad = "00000000";
    const hexSeconds = Math.floor(date.getTime() / 1000).toString(16)
    return pad.substring(0, pad.length - hexSeconds.length) + hexSeconds + "0000000000000000";
};

export function getTimestampFromObjectId(objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000).getTime();
};

export function formatMongoObjectId(objectId) {
    return `ObjectId("${objectId}")`
}