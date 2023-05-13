import { roundedNumber } from './roundedNumber'

export const generateRandomPrice = () => {
  const randomNumber = Math.random() * (1 - 0.5) + 0.5
  return roundedNumber(randomNumber)
}
