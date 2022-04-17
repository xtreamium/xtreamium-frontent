import { DateTime } from "luxon";
import roundToNearestMinutes from "date-fns/roundToNearestMinutes";

export const convertEpochToSpecificTimezone = (
  timeEpoch: number,
  offset: number = 0
) => {
  var d = new Date(timeEpoch * 1000);
  var utc = d.getTime() + d.getTimezoneOffset() * 60000; //This converts to UTC 00:00
  var nd = new Date(utc + 3600000 * offset);
  return nd.toLocaleDateString();
};

export const roundDateDown = (
  date: Date,
  intervalMilliseconds: number
): Date => {
  var modTicks = date.getTime() % intervalMilliseconds;
  var delta = modTicks === 0 ? 0 : date.getTime() - modTicks;
  return new Date(delta);
};

export const roundToNextHour = (date: Date): Date => {
  date.setHours(date.getHours() + 1);
  date.setMinutes(0, 0, 0);
  date.setSeconds(0);

  return date;
};
export const roundTimeAndFormat = (
  date: Date,
  roundToMinutes: number
): Date => {
  return roundToNearestMinutes(date, { nearestTo: roundToMinutes * -1 });
};

export const convertUTCToLocal = (date: Date): Date => {
  var localOffset = date.getTimezoneOffset() * 60000;
  var localTime = date.getTime();

  return new Date(localTime - localOffset);
};
export const convertLocalToUTC = (date: Date): Date => {
  var localOffset = date.getTimezoneOffset() * 60000;
  var localTime = date.getTime();
  return new Date(localTime + localOffset);
};

export const dateToTimeString = (date: Date): string => {
  const dt = DateTime.fromJSDate(date);
  return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
};
