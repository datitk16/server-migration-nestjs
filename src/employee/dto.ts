import { IsDate, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeDto {
    @IsString()
    @ApiProperty()
    firstName: string;

    @IsString()
    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    phoneNumber: string;

    @IsDate()
    @ApiProperty()
    hireDate: Date;

    // @ManyToMany(() => Job)
    // @JoinColumn({ name: 'job_id' })
    // job: Job;

    // @ManyToMany(() => Department)
    // @JoinColumn({ name: 'department_id' })
    // department: Department;
}
