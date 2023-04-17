import { BaseEntity } from '@libs/shared/typeorm/entities';
import { Column, Entity, EnumColumn, HashColumn, Unique } from '@libs/shared/typeorm';
import { CredentialType, Status } from '@libs/shared/constants';

@Entity('aut_credentials')
@Unique('aut_unique_username_type_deleted_at', ['username', 'type', 'deletedAt'])
export class CredentialEntity extends BaseEntity {
  @EnumColumn({ default: CredentialType.Id })
  type: CredentialType;

  @Column()
  username: string;

  @HashColumn()
  password: string;

  @EnumColumn({ default: Status.active })
  status: Status;

  @Column()
  sourceId: number;

  @Column()
  phoneNumber: number;
}
