/* eslint-disable @typescript-eslint/no-inferrable-types */
import { InjectEntityManager } from '@nestjs/typeorm';
import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  FindTreeOptions,
  QueryRunner,
  SaveOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ENTITY_REPOSITORY_METADATA } from '../constants';
import { IEntity } from '../entities/base.entity';

export class BaseRepository<TEntity extends IEntity> {
  @InjectEntityManager() protected readonly manager: EntityManager;
  // @Inject(REQUEST) protected readonly request: any;

  protected get entityTarget() {
    return Reflect.getMetadata(ENTITY_REPOSITORY_METADATA, this.constructor);
  }

  protected get repository() {
    return this.manager.getRepository<TEntity>(this.entityTarget);
  }

  protected get treeRepository() {
    return this.manager.getTreeRepository<TEntity>(this.entityTarget);
  }

  protected get author() {
    // return this.request?.user;
    return {} as any;
  }

  async count(options?: FindManyOptions<TEntity>) {
    return this.repository.count(options);
  }

  create(partialEntity: DeepPartial<TEntity>) {
    return this.repository.create(partialEntity);
  }

  async find(options?: FindManyOptions<TEntity>) {
    return this.repository.find(options);
  }

  async findOne(options?: FindOneOptions<TEntity>) {
    return this.repository.findOne(options);
  }

  async findOneOrFail(options?: FindOneOptions<TEntity>) {
    return this.repository.findOneOrFail(options);
  }

  // async findByIds(ids: number[], options?: FindManyOptions<TEntity>) {
  //   return this.repository.find({ where: { id: 1 } });
  // }

  async countDescendants(entity: TEntity) {
    return this.treeRepository.countDescendants(entity);
  }

  async countAncentors(entity: TEntity) {
    return this.treeRepository.countAncestors(entity);
  }

  async findDescendants(entity: TEntity, options?: FindTreeOptions) {
    return this.treeRepository.findDescendants(entity, options);
  }

  async findAncentors(entity: TEntity, options?: FindTreeOptions) {
    return this.treeRepository.findAncestors(entity, options);
  }

  async save(partialEntity: DeepPartial<TEntity>) {
    if (this.author?.id) {
      partialEntity.createdBy = this.author?.id;
      partialEntity.updatedBy = this.author?.id;
    }

    return this.repository.save(partialEntity);
  }

  async saveAll(entities: DeepPartial<TEntity>[], options?: SaveOptions) {
    return this.repository.save(entities, options);
  }

  async insert(partialEntity: QueryDeepPartialEntity<TEntity>) {
    if (this.author?.id) {
      // partialEntity.createdBy = this.author?.id;
      // partialEntity.updatedBy = this.author?.id;
    }

    return this.repository.insert(partialEntity);
  }

  async update(id: number, partialEntity: QueryDeepPartialEntity<TEntity>) {
    if (this.author?.id) {
      // partialEntity.createdBy = this.author?.id;
      // partialEntity.updatedBy = this.author?.id;
    }

    return this.repository.update(id, partialEntity);
  }

  async softRemove(partialEntity: DeepPartial<TEntity>) {
    partialEntity.deletedBy = this.author?.id;
    return this.repository.softRemove(partialEntity);
  }

  async delete(options: FindOptionsWhere<TEntity>) {
    return this.repository.delete(options);
  }

  async deleteByIds(ids: number[]) {
    return this.repository.delete(ids);
  }

  createQueryRunner(alias?: string, queryRunner?: QueryRunner) {
    return this.repository.createQueryBuilder(alias, queryRunner);
  }

  getSequenceValueQuery(seqKey: string, increment: number = 1) {
    const query = `
      DECLARE @sequence BIGINT;
      EXEC @sequence = dbo.Proc_GetSequenceVal @sSeqName = ${seqKey}, @iIncrement = ${increment};
      SELECT @sequence;
    `;

    return query;
  }

  async getSequenceValue(seqKey: string, increment: number = 1) {
    const query = this.getSequenceValueQuery(seqKey, increment);

    const values = await this.manager.query(query);

    return (values?.[0]?.seqValue as number) || 0;
  }

  async paginate(queryBuilder: SelectQueryBuilder<TEntity>, page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    // use getManyAndCount can count all data in database (after filtered)
    const [items, totalItems] = await queryBuilder.skip(skip).take(limit).getManyAndCount();

    const isFloat = totalItems % limit !== 0;
    const pages = totalItems / limit;
    let totalPages: number = Math.floor(pages);
    if (isFloat) totalPages += 1;

    return {
      data: {
        items,
        meta: {
          totalItems,
          itemCount: items.length,
          itemsPerPage: limit,
          totalPages,
          currentPage: page,
        },
      },
    };
  }

  async paginateRawData(query: string, queryCount: string, page: number = 1, limit: number = 1) {
    const count = await this.manager.query(queryCount);
    const items = await this.manager.query(query);

    const totalItems = count[0].total;
    const isFloat = totalItems % limit !== 0;
    const pages = totalItems / limit;
    let totalPages: number = Math.floor(pages);
    if (isFloat) totalPages += 1;

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }

  addConditionCompany(queryBuilder: SelectQueryBuilder<TEntity>, companyId: number) {
    if (companyId) {
      queryBuilder.andWhere(`${queryBuilder.alias}.businessUnitId = :companyId`, { companyId });
    }
  }
}
