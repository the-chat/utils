import {sort} from "./default"

// todo?: depends on Date constructor argument
type DateArg = number | string

const getTime = <T extends DateArg>(dateValue: T) =>
  new Date(dateValue).getTime()

const sortByDate = <T>(arr: T[], getDateArg: (arg: T) => DateArg) =>
  sort(arr, (arg) => getTime(getDateArg(arg)))

export {sortByDate}
