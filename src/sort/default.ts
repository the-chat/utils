const sort = <T, R extends number | bigint>(
  arr: T[],
  // learn: what is "...or an enum type" type in getArg calling
  getNum: (arg: T) => R
) => arr.sort((a, b) => getNum(a) - getNum(b))

const sortToGroups = <T>(arr: T[], getKey: (arg: T) => string) =>
  arr.reduce<{ [group: string]: T[] }>((groups, value) => {
    const key = getKey(value)

    if (!groups[key]) groups[key] = []
    groups[key].push(value)

    return groups
  }, {})

export { sort, sortToGroups }
