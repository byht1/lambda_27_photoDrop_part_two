export const validateMessage = {
  phoneNumber:
    'The phone number must be in the format +380ХХХХХХХХХХ. The country code may be different',
  isNumeric: 'The string must consist of numbers only',
  length: (values: number) => `The length of the line must be ${values} characters`,
};
