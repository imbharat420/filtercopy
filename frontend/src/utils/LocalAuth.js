// Save the JWT token in the browser's local storage
export function saveJWT(token) {
  const encryptedToken = token && window.btoa(token);
  localStorage.setItem('token', encryptedToken);
}

// Get the JWT token from the browser's local storage
export function getJWT() {
  const encryptedToken = localStorage.getItem('token');
  let token = encryptedToken && window.atob(encryptedToken);
  return token || undefined;
}

// Clear the JWT token from the browser's local storage
export function clearJWT() {
  localStorage.removeItem('jwt');
}
