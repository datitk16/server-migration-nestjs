import { BaseEntity } from "@libs/shared/typeorm/entities";
import { Column, Entity, JoinColumn, ManyToOne, ViewColumn, ViewEntity } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('aut_users_permissions')
export class UserPermissionEntity extends BaseEntity {
    // @ViewColumn()
    // @ManyToOne(
    //     type => UserEntity,
    //     userEntity => userEntity.permissions,
    // )
    // @JoinColumn()
    // @Column()
    // id: number;

    @ViewColumn()
    @Column()
    firstName: string;

    @ViewColumn()
    @Column()
    lastName: string;

    @ViewColumn()
    @Column()
    email: string;

    @ViewColumn()
    @Column()
    status: string;

    @ViewColumn()
    @Column()
    permissionName: string;

}
