export function getToken() {
  let userData;
  if (
    typeof window !== "undefined" &&
    localStorage?.getItem("loggedInUserData")
  ) {
    userData = JSON.parse(localStorage?.getItem("loggedInUserData") || "");
  }
  return userData?.access_token;
}
