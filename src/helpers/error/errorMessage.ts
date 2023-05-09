export const messagesCodeError: { [index: number]: string } = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
  500: 'Server error',
  503: 'Service Unavailable',
};

export const messageError = {
  notUser: 'User is not exit',
  invalidVerificationCode: 'The verification code you entered is incorrect. Please try again.',
  invalidVerificationCodeTime: 'Verification timed out',
  notFound: 'No records found in the database matching your query.',
  maxLimitAttemptNumber: 'You have reached the maximum number of attempts, try again later',
};
