// https://github.com/withspectrum/spectrum/blob/alpha/admin/src/helpers/utils.js
export const timeAgo = (time) => {
  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = 60 * 1000;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;
  const MS_PER_YEAR = MS_PER_DAY * 365;

  let current = new Date();
  let previous = new Date(time);
  let elapsed = current - previous;

  if (elapsed < MS_PER_MINUTE) {
    return Math.round(elapsed / MS_PER_SECOND) + 's ago';
  } else if (elapsed < MS_PER_HOUR) {
    return Math.round(elapsed / MS_PER_MINUTE) + 'm ago';
  } else if (elapsed < MS_PER_DAY) {
    return Math.round(elapsed / MS_PER_HOUR) + 'h ago';
  } else if (elapsed < MS_PER_YEAR) {
    return Math.round(elapsed / MS_PER_DAY) + 'd ago';
  } else {
    return Math.round(elapsed / MS_PER_YEAR) + 'y ago';
  }
};
