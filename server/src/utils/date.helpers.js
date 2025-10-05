/**
 * Converts a "YYYYMMDD" string to the day of the year.
 * @param {string} dateStr - The date string in "YYYYMMDD" format.
 * @returns {number} The day of the year (1-366).
 */
export const getDayOfYear = (dateStr) => {
  const date = new Date(`${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`);
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};