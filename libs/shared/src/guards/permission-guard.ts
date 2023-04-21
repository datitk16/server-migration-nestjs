import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PermissionOption } from '../interfaces';
import { validateSync } from 'class-validator';

export class PermissionGuard implements CanActivate {
    private readonly permission: PermissionOption;

    constructor(permission?: Partial<PermissionOption>) {
        this.permission = new PermissionOption(permission);
        const errors = validateSync(this.permission);
        if (errors.length > 0) {
            throw errors;
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (this.permission.action !== context.switchToHttp().getRequest().user?.permission) {
            throw new UnauthorizedException('No permission!');
        }
        return true;
    }

}