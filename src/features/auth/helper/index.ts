export function getToken() {
  const timeLeft = getTokenDuration();

  if (timeLeft < 0) {
    return null;
  }

  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function setTokenExpirationInHours(hours: number) {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + hours);

  localStorage.setItem('expiresIn', expiration.toISOString());
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiresIn') || 0;
  const expirationDate = new Date(storedExpirationDate);
  const nowDate = new Date();
  const duration = expirationDate.getTime() - nowDate.getTime();

  return duration;
}
