export function generateQuery(obj: any): string {
  let query: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      query = [...query, `${key}=${obj[key]}`];
    }
  }
  return query.join("&");
}

export const setStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (err) {
    console.error("Error storing data in local storage:", err);
  }
};

export const getStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return [];
    }
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error loading data from local storage:", err);
    return null;
  }
};
