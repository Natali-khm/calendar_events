import moment, { Moment } from "moment";

export const rules = {
  required:
    (message: string = "Required") =>
    () => ({ required: true, message }),

  isDateAfter: (message: string) => () => ({
    validator(_: any, value: Moment) {
      if (moment().isSameOrBefore(value)) {
        return Promise.resolve();
      }
      return Promise.reject(new Error(message));
    },
  }),
};
