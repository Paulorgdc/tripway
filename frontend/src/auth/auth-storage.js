/**
 * @fileoverview Authentication storage utilities for managing local and session storage states.
 */

/**
 * Persists authentication status and user metadata in storage.
 * @param {Object} user - User details object returned from backend
 * @param {boolean} remember - Option to use localStorage instead of sessionStorage
 */
export function setAuth(user, remember = false) {
  const store = remember ? localStorage : sessionStorage;
  store.setItem("tw_auth", "1");
  if (user) {
    store.setItem("tw_user", JSON.stringify(user));
  }
}

/**
 * Checks if active session exists in persistent or session storage.
 * @returns {boolean} True if authenticated
 */
export function isAuthed() {
  return !!(localStorage.getItem("tw_auth") || sessionStorage.getItem("tw_auth"));
}

/**
 * Retrieves the currently stored user profile data.
 * @returns {Object|null} Mapped user object or null if missing/invalid
 */
export function getUser() {
  const rawData = localStorage.getItem("tw_user") || sessionStorage.getItem("tw_user");
  try {
    return rawData ? JSON.parse(rawData) : null;
  } catch {
    return null;
  }
}

/**
 * Clears all stored authentication states and session tokens.
 */
export function clearAuth() {
  ["tw_auth", "tw_user"].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}