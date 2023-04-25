import { BaseEntity } from '@libs/shared/typeorm/entities';
import { Column, Entity, EnumColumn, HashColumn } from '@libs/shared/typeorm';
import { CredentialType, Status } from '@libs/shared/constants';

@Entity('aut_user')
// @Unique('aut_unique_username_type_deleted_at', ['username', 'type', 'deletedAt'])
export class UserEntity extends BaseEntity {

  @EnumColumn({ default: CredentialType.Id, nullable: true })
  type: CredentialType;

  @Column()
  email: string;

  @Column()
  username: string;

  @HashColumn()
  password: string;

  @EnumColumn({ default: Status.active, nullable: true })
  status: Status;

  @Column({ nullable: true })
  sourceId: number;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  permission: string;

  // @OneToMany(
  //   type => UserPermissionEntity,
  //   userPermission => userPermission.id,
  // )
  // permissions: UserPermissionEntity[];
}
