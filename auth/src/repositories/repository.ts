import { EntityRepository } from '@libs/shared/typeorm/decorators';
import { BaseRepository } from '@libs/shared/typeorm/repositories';
import { UserEntity } from '../entities/entity';

@EntityRepository(UserEntity)
export class AuthRepository extends BaseRepository<UserEntity> { }
