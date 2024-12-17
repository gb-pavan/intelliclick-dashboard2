import { API } from '@utils/enums';
import { getToken, handleError } from '@utils/helpers';
import Axios, { AxiosError } from 'axios';

export const callApi = async (url: string, method: API, data?: object | null, shouldThrowError?: boolean) => {
  // Axios.defaults.headers.common.Authorization = getToken();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const uri = `${baseUrl}/${url}`;
  const DEFAULT_HEADER = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNmM2MyMTYwMjgzMmQ1ZDU5NmM4NmEiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJ0ZXN0LnN0dWRlbnRAZ21haWwuY29tIiwibmFtZSI6IlRlc3QgQkRBIiwiaWF0IjoxNzMyOTU5ODEyfQ.9zD5QqdxlazCoQVLSRIfJ5IcBB__eu0YRMMBgIf5YVE",
    },
  };
  try {
    const response =
      method === API.POST ? await Axios.post(uri, data, DEFAULT_HEADER) : await Axios.get(uri,DEFAULT_HEADER);
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, shouldThrowError);
  }
};

export const callingApi = async (url: string, method: API, data?: object | null, shouldThrowError?: boolean) => {
  // Axios.defaults.headers.common.Authorization = getToken();
  const baseUrl = 'http://localhost:4000/';
  const uri = `${baseUrl}/${url}`;
  const DEFAULT_HEADER = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzNmM2MyMTYwMjgzMmQ1ZDU5NmM4NmEiLCJyb2xlIjoiQkRBIiwibW9kZXJhdG9yIjpmYWxzZSwiZW1haWwiOiJ0ZXN0LnN0dWRlbnRAZ21haWwuY29tIiwibmFtZSI6IlRlc3QgQkRBIiwiaWF0IjoxNzMyOTU5ODEyfQ.9zD5QqdxlazCoQVLSRIfJ5IcBB__eu0YRMMBgIf5YVE",
    },
  };
  try {
    const response =
      method === API.POST ? await Axios.post(uri, data, DEFAULT_HEADER) : await Axios.get(uri,DEFAULT_HEADER);
    return response.data;
  } catch (error) {
    return handleError(error as AxiosError, shouldThrowError);
  }
};
