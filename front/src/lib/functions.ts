export function generateQuery(obj: any): string {
  let query: string[] = [];
  for (const key in obj) {
    if (obj[key]) {
      query = [...query, `${key}=${obj[key]}`];
    }
  }
  return query.join("&");
}
