function getErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: 'Invalid request',
    401: 'Unauthorized',
    404: 'Not found',
    429: 'Too many requests. Please wait.',
    500: 'Server error. Try again later.',
  };
  return messages[status] || 'Something went wrong';
}

export async function apiFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  return response.json();
}
