export function readArrayFromStorage(key, fallback = []) {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) {
      return fallback;
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : fallback;
  } catch (error) {
    return fallback;
  }
}

export function writeToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
