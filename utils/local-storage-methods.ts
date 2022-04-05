interface SetLocalStorageValue {
  (key: string, value: string | any[] | { [key: string]: any }): boolean;
}
interface GetLocalStorageValue {
  (key: string): string | any[] | { [key: string]: any } | false;
}

interface RemoveLocalStorageValue {
  (key: string): boolean
}

export const setLocalStorageValue: SetLocalStorageValue = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const getLocalStorageValue: GetLocalStorageValue = (key) => {
  const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : undefined;
  if (item) {
    return JSON.parse(item);
  } else {
    return false;
  }
};

export const removeLocalStorageValue: RemoveLocalStorageValue = (key) => {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}