/** Tiny classname joiner — keeps JSX readable without pulling in a dependency. */
export const classNames = (...values) =>
  values
    .flat()
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()

export default classNames
