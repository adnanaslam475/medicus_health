import { APP_ROLES, ROLES_ACTIONS } from "common/constants/roles";
import { object, userData } from "common/utils";

export function useRoleGuard() {
	type roles = "User" | "Doctor" | "Admin";
	type actions = "HIDE" | "DEFFER_CLICKS" | "REPLACE_CHILDREN";
	const { user } = userData.getUserData();

	const roleName: roles = user?.role as roles;

	function activate(item: any, authActions: any) {
		if (!authActions && object.isObjectEmpty(authActions)) {
			// * return if no action is passed, sort of error handling
			return item;
		}
		switch (roleName) {
			case APP_ROLES.Doctor:
				if (authActions[roleName]?.action) {
					if (authActions[roleName].action === ROLES_ACTIONS.HIDE) {
						return null;
					}
					if (authActions[roleName].action === ROLES_ACTIONS.CALLBACK) {
						return authActions[roleName]?.callback();
					}
				} else {
					return item;
				}
				break;

			default:
				return item;
		}
	}
	return {
		activate,
		get isAdmin() {
			return roleName === "Admin";
		},
		get isDoctor() {
			return roleName === "Doctor";
		},
		get isPatient() {
			return roleName === "User";
		},
	};
}
