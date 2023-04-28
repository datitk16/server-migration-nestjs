import Str from '@libs/shared/supports/str';
import { EntityRepository } from '@libs/shared/typeorm/decorators';
import { BaseRepository } from '@libs/shared/typeorm/repositories';
import { Brackets } from 'typeorm';
import { GetListTemplatesDto } from './dto';
import { TemplateEntity } from './entity';

@EntityRepository(TemplateEntity)
export class TemplateRepository extends BaseRepository<TemplateEntity> {
  private readonly alias = 'template';

  getListQuery(dto: GetListTemplatesDto) {
    const query = this.repository.createQueryBuilder(this.alias);
    const { orderBy, orderType } = dto;

    if (dto.hasSearchKeyword()) {
      const keyword = Str.filterSearchKeyword(dto.key);
      query.andWhere(new Brackets((qb) => qb.orWhere(`${this.alias}.name LIKE :keyword`, { keyword })));
    }
    if (orderBy) {
      query.orderBy(`${this.alias}.${orderBy}`, orderType);
    }
    return query;
  }
}
