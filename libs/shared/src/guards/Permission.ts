import { PermissionOption } from "../interfaces";
import { PermissionGuard } from "./permission-guard";

export const Permission = (permissionOption: Partial<PermissionOption>) => {
    return new PermissionGuard(permissionOption);
};
