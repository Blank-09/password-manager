const numbers = '0123456789'
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const symbols = '!@#$%^&*()'
const allCharacters = lowercaseLetters + numbers + uppercaseLetters + symbols

export default function generatePassword(options: IPasswordGeneratorOptions) {
  let password = ''
  const chars = includesCharacters(options.contains)

  for (let i = 0; i < options.length; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  return password
}

function includesCharacters(options?: IPasswordGeneratorInclude) {
  if (!options) return allCharacters

  return (
    (options.number ? numbers : '') +
    (options.lowercase ? lowercaseLetters : '') +
    (options.uppercase ? uppercaseLetters : '') +
    (options.symbol ? symbols : '')
  )
}

export interface IPasswordGeneratorOptions {
  length: number
  contains: IPasswordGeneratorInclude
  password: string
  itShouldBe: {
    isEasyToSay: boolean
    isEasyToRead: boolean
    isAllCharacters: boolean
  }
}

export interface IPasswordGeneratorInclude {
  uppercase: boolean
  lowercase: boolean
  number: boolean
  symbol: boolean
}
