export function parseJson(jsonString: string) {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (error) {
    obj = null;
  }
  return obj;
}
