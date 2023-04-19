import { Column, Entity, JoinColumn, ManyToOne } from '@libs/shared/typeorm';
import { BaseEntity } from '@libs/shared/typeorm/entities';
import { Employee } from 'src/employee/entity';

@Entity('time_off')
export class Salary extends BaseEntity {

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ nullable: true })
    reason: string;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'salary_employee_id' })
    SalaryEmployee: Employee;
}
