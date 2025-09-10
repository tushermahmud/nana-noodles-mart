export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  } else if (typeof error === 'string' && error) {
    return error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  } else {
    return 'Something went wrong';
  }
};
