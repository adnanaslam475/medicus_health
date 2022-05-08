import React, {
  memo,
  PropsWithChildren,
  FunctionComponent,
  ReactElement,
} from "react";
import { object, userData } from "common/utils";
import { APP_ROLES, ROLES_ACTIONS } from "common/constants/roles";

type roles = "User" | "Doctor";
type actions = "HIDE" | "DEFFER_CLICKS" | "REPLACE_CHILDREN";
type props = {
  authActions: {
    [k in roles]?: {
      action: actions;
      component?: React.ReactNode;
    };
  };
};

function roleActions({
  action,
  children,
  component,
}: {
  action: actions | undefined;
  children: React.ReactNode;
  component: React.ReactNode;
}) {
  if (!action) return children || null; // * if no action is passed for a specific case, sort of error handling
  if (action === ROLES_ACTIONS.HIDE) return null;
  if (action === ROLES_ACTIONS.DEFFER_CLICKS)
    return React.cloneElement(children as ReactElement, {
      onClick: () => null,
    });
  if (action === ROLES_ACTIONS.REPLACE_CHILDREN) return component;
}

function RoleGuard({
  children,
  authActions,
}: PropsWithChildren<props>): React.ReactNode {
  const { user } = userData.getUserData();
  if (!authActions || object.isObjectEmpty(authActions))
    return children || null;

  const role: roles = user?.role as roles;

  switch (role) {
    case APP_ROLES.Doctor:
      return roleActions({
        action: authActions[role]?.action as actions,
        children,
        component: authActions[role]?.component,
      });
    case APP_ROLES.User:
      return roleActions({
        action: authActions[role]?.action,
        children,
        component: authActions[role]?.component,
      });
    default:
      return children;
  }
}

export default memo(RoleGuard as FunctionComponent<PropsWithChildren<props>>);

RoleGuard.defaultProps = {
  className: "",
  authActions: undefined,
};
