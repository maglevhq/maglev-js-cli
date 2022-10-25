export const camelize = (str: string, uppercaseFirstLetter = false): string => {
  let newStr = str
  .toLowerCase()
  .replace(/[^\dA-Za-z]+(.)/g, (m, chr) => chr.toUpperCase())

  if (uppercaseFirstLetter)
    newStr = newStr.charAt(0).toUpperCase() + newStr.slice(1)

  return newStr
}
