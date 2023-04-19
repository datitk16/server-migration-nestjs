import { Employee } from './../employee/entity';
import { Column, Entity, JoinColumn, ManyToOne } from '@libs/shared/typeorm';
import { BaseEntity } from '@libs/shared/typeorm/entities';

@Entity('salary')
export class Salary extends BaseEntity {
    @Column()
    salary: string;

    @Column()
    fromDate: Date;

    @Column()
    toDate: Date;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'salary_employee_id' })
    SalaryEmployee: Employee;
}
