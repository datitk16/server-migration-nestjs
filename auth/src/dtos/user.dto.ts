import { CredentialType, Status } from "@libs/shared/constants";
import { BaseRequestDto } from "@libs/shared/dtos/request.dto";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger'

export class UserBaseDto extends BaseRequestDto {

    @IsOptional()
    @IsEnum(CredentialType)
    type: CredentialType;

    @IsOptional()
    @IsEnum(Status)
    status: Status;

    @IsOptional()
    @IsNumber()
    sourceId: number;
    @IsOptional()
    @IsNumber()
    phoneNumber: number;

    @IsOptional()
    @IsString()
    permission: string;
}

export class RegisterDto extends UserBaseDto {
    @IsString()
    @ApiProperty({ type: String, description: 'Email' })
    email: string;

    @IsString()
    @ApiProperty({ type: String, description: 'User Name' })
    username: string;

    @IsString()
    @ApiProperty({ type: String, description: 'Password' })
    password: string;
}

export class LoginDto extends UserBaseDto {
    @IsString()
    @ApiProperty({ type: String, description: 'Email' })
    email: string;

    @IsString()
    @ApiProperty({ type: String, description: 'Password' })
    password: string;
}
