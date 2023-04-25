import { CredentialType, Status } from "@libs/shared/constants";
import { BaseRequestDto } from "@libs/shared/dtos/request.dto";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class RegisterDto extends BaseRequestDto {
    @IsString()
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @ApiProperty({ type: String })
    username: string;

    @IsString()
    @ApiProperty({ type: String })
    password: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(CredentialType)
    type: CredentialType;

    @IsOptional()
    @ApiPropertyOptional()
    @IsEnum(Status)
    status: Status;

    // @ApiProperty()
    // @IsOptional()
    // @IsNumber()
    // sourceId: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    phoneNumber: number;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    permission: string;
}

export class LoginDto extends BaseRequestDto {
    @IsString()
    @ApiProperty({ type: String })
    email: string;

    @IsString()
    @ApiProperty({ type: String })
    password: string;
}
