export function generateQuery(obj: any): string {
  let query: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      query = [...query, `${key}=${obj[key]}`];
    }
  }
  return query.join("&");
}

export const getValueLabel = (arr, value) => {
  // console.log('getValueLabel => ', arr, value)

  if (!Array.isArray(arr)) {
    console.error('getValueLabel => Invalid array', arr);
    return null;
  }

  const foundOption = arr.find((option) => option.value === value);
  return foundOption ? foundOption.label : null;
};
