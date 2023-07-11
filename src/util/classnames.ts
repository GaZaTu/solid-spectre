type Value = string | number | boolean | undefined | null
type Argument = Value | Record<string, unknown> | Argument[]

// stolen from https://github.com/JedWatson/classnames
export const classnames = (...args: Argument[]): string => {
  const classes = [] as any[]

  for (const arg of args) {
    if (!arg) {
      continue
    }

    switch (typeof arg) {
    case "string":
    case "number":
      classes.push(arg)
      break

    case "object":
      if (Array.isArray(arg)) {
        if (arg.length) {
          const inner = classnames(...arg)
          if (inner) {
            classes.push(inner)
          }
        }
      } else {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          classes.push(arg.toString())
          continue
        }

        for (const key of Object.keys(arg)) {
          if ((arg as any)[key]) {
            classes.push(key)
          }
        }
      }
      break
    }
  }

  return classes.join(" ")
}
