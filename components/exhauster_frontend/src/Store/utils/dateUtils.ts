import { format, parse, subMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

// Check is date is valid date
export function isValidDate(dateObject: Date): boolean {
  return new Date(dateObject).toString() !== 'Invalid Date';
}

// Check are dates equal
export function checkIsDatesEqual(date1: Date, date2: Date): boolean {
  return date1.getTime() === date2.getTime();
}

// Search in the dates list for closest available date depends on target
export function findClosestDate(dates: string[], targetDate: string): number {
  if (!dates?.length) {
    return -1;
  }

  const datesTimes = dates.map((date) =>
    Math.abs(new Date(targetDate).getTime() - new Date(date).getTime()),
  );

  const closestDateIndex = datesTimes.indexOf(Math.min(...datesTimes));

  return closestDateIndex;
}

// Dates conversion

// Available date formats
enum DateFormat {
  DefaultDisplayFormat = 'dd.MM.yyyy, HH:mm',
  DefaultBackendDateFormat = "yyyy-MM-dd'T'HH:mm:ssxxx",
}

// Format UTC date into local time string date
// Input 2022-12-21T10:00:00+00:00
// Output for MSK 21.12.2022, 13:00 (+3 hours)
export function formatDateToString(date: string | Date | number): string {
  return format(new Date(date), DateFormat.DefaultDisplayFormat);
}

// Revert local date string to Date
// Input 21.12.2022, 13:00
// Output local Date object
export function revertFormatDateToString(date: string): Date {
  return parse(date, DateFormat.DefaultDisplayFormat, new Date());
}

// Input is  utc string date time without timezone information
// timezone absent means impossibility to convert date to local time
// need add timezone automatically depends on local time
// Input 2022-12-22T07:00:00.000000
// Output depends on local time zone for MSK 22.12.2022, 10:00 (+3 hours)
export function formatUTCZoneLessDateToString(date: string): string {
  return format(
    subMinutes(new Date(date), new Date().getTimezoneOffset()),
    DateFormat.DefaultDisplayFormat,
  );
}

// Format local Date or string date to server string Date
export function formatDateToBackendString(date: string | Date): string {
  return format(new Date(date), DateFormat.DefaultBackendDateFormat);
}

export function formatLocalToUTCDateString(date: string | number | Date) {
  return format(utcToZonedTime(date, 'UTC'), "yyyy-MM-dd'T'HH:mm:ss");
}
