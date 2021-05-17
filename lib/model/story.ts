const QUOTES = {
  single: '\u0027',
  singleLeft: '\u2018',
  singleRight: '\u2019',
  double: '\u0022',
  doubleLeft: '\u201C',
  doubleRight: '\u201D',
}

const SINGLE_QUOTES = [QUOTES.single, QUOTES.singleLeft, QUOTES.singleRight]
const DOUBLE_QUOTES = [QUOTES.double, QUOTES.doubleLeft, QUOTES.doubleRight]

export function fixTitle(title = '') {
  title = title.trim()
  const first = title.charAt(0)
  const last = title.charAt(title.length - 1)
  if (
    (SINGLE_QUOTES.includes(first) && SINGLE_QUOTES.includes(last)) ||
    (DOUBLE_QUOTES.includes(first) && DOUBLE_QUOTES.includes(last))
  ) {
    title = title.substring(1, title.length - 1)
  }
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .replace(new RegExp(QUOTES.double, 'g'), QUOTES.single)
    .replace(new RegExp(QUOTES.doubleLeft, 'g'), QUOTES.singleLeft)
    .replace(new RegExp(QUOTES.doubleRight, 'g'), QUOTES.singleRight)
}
