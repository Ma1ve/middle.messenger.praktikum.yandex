type APIError = {
  reason: string;
};

export function apiHasError(response: any): response is APIError{
  return response && response.response && response.response.reason
}
