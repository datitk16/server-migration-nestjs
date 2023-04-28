import { Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { OrderType } from '../constants';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class BasePaginateDto {
  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  limit?: number = 20;

  @IsOptional()
  @Transform((params) => (!params.value ? [] : typeof params.value === 'string' ? [params.value] : params.value))
  status?: string[];

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
  })
  isActive?: boolean;

  @IsOptional()
  ignores?: number[];

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  @Transform((orderType) => {
    return orderType.value.toUpperCase();
  })
  @IsString()
  orderType?: OrderType = OrderType.DESC;

  @IsOptional()
  @IsString()
  key?: string;

  toPaginationOptions?(): IPaginationOptions {
    return {
      page: this.page,
      limit: this.limit,
    };
  }

  toElasticOptions?() {
    return {
      size: this.limit,
      from: (this.page - 1) * this.limit,
    };
  }

  hasSearchKeyword?() {
    return this.key && this.key.length > 0;
  }
}
