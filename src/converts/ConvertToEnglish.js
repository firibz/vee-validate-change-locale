const persianAndArabicToEnglishNumbers = {
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9'
}

const englishNumbers = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9'
}
// ECMAScript 2018 Standard Method:
// const persianToEnglishWholeText = { ...persianToEnglishLetters, ...persianAndArabicToEnglishNumbers };
// ECMAScript 2015(ES6) Standard Method:
const onlyEnglishNumbers = Object.assign({}, englishNumbers, persianAndArabicToEnglishNumbers)

export function toEnglishNumbers (input) {
  let output = ''

  for (let i = 0, il = input.length; i < il; i++) {
    output += persianAndArabicToEnglishNumbers[input.charAt(i)] || input.charAt(i)
  }

  return output
}

export function toOnlyEnglishNumbers (input) {
  let output = ''

  for (let i = 0, il = input.length; i < il; i++) {
    output += onlyEnglishNumbers[input.charAt(i)] || ''
  }

  return output
}
