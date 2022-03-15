export function getUserData() {
  let userData;
  if (
    typeof window !== "undefined" &&
    localStorage?.getItem("loggedInUserData")
  ) {
    userData = JSON.parse(localStorage?.getItem("loggedInUserData") || "");
  }
  return userData;
}

export function getToken() {
  let data = getUserData();
  return data?.access_token;
}

export function getRole() {
  let data = getUserData();
  return data?.user?.role;
}
