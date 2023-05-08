import { TCreateError, INewError } from 'type';
import { messagesCodeError } from './errorMessage';

export const createError: TCreateError = (status, message = messagesCodeError[status]) => {
  const error: INewError = new Error(message);
  error.status = status;

  return error;
};
