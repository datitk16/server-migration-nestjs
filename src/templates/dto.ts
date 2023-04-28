import { BasePaginateDto } from "@libs/shared/dto";
import { IsOptional, IsString } from "class-validator";

export class BaseTemplateDto {
    @IsString()
    name: string;

    @IsString()
    html: string;

    @IsString()
    @IsOptional()
    css?: string;
}

export class GetListTemplatesDto extends BasePaginateDto {
}
