export function parseJson(jsonString: string) {
  let obj = null;
  try {
    obj = JSON.parse(jsonString);
  } catch (error) {
    obj = null;
  }
  return obj;
}

export function hasValidMessage(text: string) {
  var format = /[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(text)) {
    return true;
  } else {
    return false;
  }
}
