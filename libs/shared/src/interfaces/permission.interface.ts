import { IsIn } from 'class-validator';

export class PermissionOption {
    @IsIn(['read', 'create', 'update', 'delete'])
    action: string;

    constructor(props) {
        this.action = props.action;
    }
}