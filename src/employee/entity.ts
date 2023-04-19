import { Column, Entity, JoinColumn, ManyToMany } from '@libs/shared/typeorm';
import { BaseEntity } from '@libs/shared/typeorm/entities';
import { Department } from 'src/department/entity';
import { Job } from '../job/entity';

@Entity('employee')
export class Employee extends BaseEntity {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    hireDate: Date;

    @ManyToMany(() => Job)
    @JoinColumn({ name: 'job_id' })
    job: Job;

    @ManyToMany(() => Department)
    @JoinColumn({ name: 'department_id' })
    department: Department;
}
