import * as DateFns from 'date-fns';

export type DateUtils = {
  now: () => Date;
  inFifteenDays(from?: Date): Date;
};

function buildDateUtils(): DateUtils {
  function now() {
    return DateFns.startOfDay(new Date());
  }

  function inFifteenDays(from?: Date) {
    return DateFns.addDays(from || now(), 15);
  }

  return {
    now,
    inFifteenDays,
  };
}

export const dateUtils = buildDateUtils();
