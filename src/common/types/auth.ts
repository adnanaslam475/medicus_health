import { User } from "generated/graphql";

export type UserDataInLocalStorage = {
  user?: User;
  remember?: boolean;
  access_token?: string;
};
