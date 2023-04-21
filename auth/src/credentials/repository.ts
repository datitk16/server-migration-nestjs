import { EntityRepository } from '@libs/shared/typeorm/decorators';
import { BaseRepository } from '@libs/shared/typeorm/repositories';
import { CredentialEntity } from './entity';

@EntityRepository(CredentialEntity)
export class CredentialRepository extends BaseRepository<CredentialEntity> { }
