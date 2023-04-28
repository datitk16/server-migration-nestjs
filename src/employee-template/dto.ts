import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class PreviewEmployeeDto {
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    summary: string;

    @ApiProperty()
    skills: Skill[];
}

export class Skill {
    @ApiProperty()
    name: string;
}