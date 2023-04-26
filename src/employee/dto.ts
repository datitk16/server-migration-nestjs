import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmployeeDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    phoneNumber: string;

    @IsDate()
    hireDate: Date;

    // @ManyToMany(() => Job)
    // @JoinColumn({ name: 'job_id' })
    // job: Job;

    // @ManyToMany(() => Department)
    // @JoinColumn({ name: 'department_id' })
    // department: Department;
}
