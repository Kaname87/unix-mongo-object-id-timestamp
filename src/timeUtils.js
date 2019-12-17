import 'datejs'
import { determine } from 'jstz'
import moment from 'moment'
import { getUnixTimestampFromObjectId } from "./mongoObjectIdUtil";
import { VALUE_TYPES } from "./constants";

const DATE_FORMAT = 'YYYY/MM/DD HH:mm:ss'

export const getTimezoneName = () => determine().name()

export const getDate = (timestamp) => new Date(timestamp * 1000)

export const isValidTimestamp = value => getDate(value).getTime() > 0;

export const isValidDate = value => new Date(value).getTime() > 0;

export function cleanDate(timestamp) {
  if(!timestamp) {
    throw new Error('You must provide a timestamp')
  }
  return moment(getDate(timestamp)).format(DATE_FORMAT)
}

export function cleanDateUtc(timestamp) {
  if(!timestamp) {
    throw new Error('You must provide a timestamp')
  }
  return moment.utc(getDate(timestamp)).format(DATE_FORMAT)
}

export function getUnixTimestampFromDate(humanDate) {
  if(!humanDate) {
    throw new Error('You must provide human date input')
  }
  const parsedDate = Date.parse(humanDate)
  if(!parsedDate) {
    throw new Error('Cannot parse date')
  }
  return parsedDate.getTime() / 1000
}

export const getUnixTime = (value, type) => {
  if (!value) {
    return moment().unix();
  }

  switch (type) {
    case VALUE_TYPES.UNIX_TIME:
      return !isNaN(value) && isValidTimestamp(value) ? value : false;
    case VALUE_TYPES.DATE:
      return isValidDate(value) ? getUnixTimestampFromDate(value) : false;
    case VALUE_TYPES.OBJECT_ID:
      const convertedTime = getUnixTimestampFromObjectId(value);
      return isValidDate(convertedTime) ? convertedTime : false;
    default:
      return false;
  }
}
