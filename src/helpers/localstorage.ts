export const fetchData = (key: string): string | null => {
  return JSON.parse(localStorage.getItem(key)!);
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};
