const setStorage = (key: string, data: any) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  } catch (err) {
    console.error("Error storing data in local storage:", err);
  }
};
const getStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (err) {
    console.error("Error loading data from local storage:", err);
    return null;
  }
};

const deleteStorage = (key: string) => {
  try {
    localStorage.deleteItem(key);
  } catch (err) {
    console.error("Error loading data from local storage:", err);
    return null;
  }
};

export default {
  getStorage,
  setStorage,
  deleteStorage,
};
