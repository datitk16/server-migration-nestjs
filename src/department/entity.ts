import { Employee } from './../employee/entity';
import { Column, Entity, JoinColumn, OneToOne } from '@libs/shared/typeorm';
import { BaseEntity } from '@libs/shared/typeorm/entities';

@Entity('department')
export class Department extends BaseEntity {
    @Column()
    departmentName: string;

    @OneToOne(() => Employee)
    @JoinColumn({ name: 'department_employee_id' })
    departmentEmployee: Employee;
}
