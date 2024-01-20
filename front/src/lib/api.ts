const url = "localhost:3001/";
// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// };

export const getCastsList = fetch(url).then((res) => res.json());
export const filterCatsList = fetch(url).then((res) => res.json());
export const addCat = fetch(url).then((res) => res.json());
export const editCat = fetch(url).then((res) => res.json());
export const deleteCat = fetch(url).then((res) => res.json());
