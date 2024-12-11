import { errorToast } from '@utils/helpers';
import { AxiosError } from 'axios';

export const handleError = (errorData: AxiosError, shouldThrowError?: boolean): void => {
  if (errorData.response) {
    const error = errorData.response.data as any;
    errorToast({ message: error?.message });
    if (shouldThrowError) throw Error(error?.message);
  } else if (errorData.request) {
    errorToast({ message: 'Network error. Refresh the page.' });
  } else {
    errorToast({ message: 'Something went wrong. Refresh the page.' });
  }
};
