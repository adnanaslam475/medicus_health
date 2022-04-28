import { UserDataInLocalStorage } from "common/types/auth";

export function getUserData() {
  let userData = <UserDataInLocalStorage>{};
  if (
    typeof window !== "undefined" &&
    localStorage?.getItem("loggedInUserData")
  ) {
    userData = JSON.parse(localStorage?.getItem("loggedInUserData") || "");
  }
  return userData;
}

export function getToken() {
  return getUserData().access_token;
}

export function getRole() {
  return getUserData().user?.role;
}
