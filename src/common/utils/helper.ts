export function parseJson(jsonString: string) {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (error) {
    console.log(error);
    obj = null;
  }
  return obj;
}
